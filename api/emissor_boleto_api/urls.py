from django.conf.urls import url, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from django.contrib import admin
from django.urls import path
from rest_framework import mixins
from rest_framework.authtoken import views
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import pyboleto
from pyboleto.bank.bancodobrasil import BoletoBB
from pyboleto.pdf import BoletoPDF
import datetime
from datetime import timedelta
from datetime import date
try:
    from StringIO import StringIO
except ImportError:
    from io import StringIO
from io import BytesIO

# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')

# ViewSets define the view behavior.
class UserViewSet(mixins.CreateModelMixin,
                                mixins.ListModelMixin,
                                mixins.RetrieveModelMixin,
                                viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet, basename='User')

@api_view(['GET'])
def generateBilletView(request):
    """
    Generate billet
    """ 
    diasVencimento = int(request.query_params['diasVencimento'])
    pagador = request.query_params['pagador']
    valorBoleto = int(request.query_params['valorBoleto'])

    listaDados = [] # array
    for i in range(1): #laço
        d = BoletoBB(7, 2)
        d.nosso_numero = '87654'
        d.numero_documento = '27.030195.10'
        d.convenio = '7777777'
        d.especie_documento = 'DM'

        d.carteira = '18'
        d.cedente = 'Projeto Integrador'
        d.cedente_documento = "102.323.777-01"
        d.cedente_endereco = ("Rua Isabel Schmidt, 349 - " +
                              "Santo Amaro - Sao Paulo/SP - " +
                              "CEP: 04743-030")
        d.agencia_cedente = '9145'
        d.conta_cedente = '35142'

        data = datetime.datetime.now()
        dataVencimento = datetime.datetime.now() + timedelta(days = diasVencimento)

        d.data_vencimento = datetime.date(dataVencimento.year, dataVencimento.month, dataVencimento.day)
        d.data_documento = datetime.date(data.year, data.month, data.day)
        d.data_processamento = datetime.date(2019, 5, 29)

        d.instrucoes = [
            "Não aceitar pagamento depois do vencimento",
            "Multa após vencimento de 2%",
            ]
        d.demonstrativo = [
            " Boleto gerado",
            ]
        d.valor_documento = valorBoleto

        d.sacado = [
            pagador, #pesquisar
            "Rua Arlindo Alberto, 240 - Jardins - São Paulo - Cep. 05547-130",
            ""
            ]
        listaDados.append(d)

    buffer = BytesIO()
    boleto = BoletoPDF(buffer)
    for i in range(len(listaDados)):
        boleto.drawBoleto(listaDados[i])
        boleto.nextPage()
    boleto.save()
    pdf_file = buffer.getvalue()

    response = HttpResponse()
    response['Content-Disposition'] = 'attachment; filename=%s' % (
        u'boletos_%s.pdf' % (
            date.today().strftime('%Y%m%d'),
        ),
    )

    response.write(pdf_file)
    return response

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^', include(router.urls)),
    path('login/', views.obtain_auth_token, name='api_token_auth'),
    path('billets/', generateBilletView)
]
