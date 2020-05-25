from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from client.models import Client, Company, Log
from client.serializers import ClientSerializer


CLIENTS_URL = reverse('client:client-list')    # /api/client/


# Default Objects for Testing
def sample_log(user):
    pass

def sample_company(user, company_name='Test Company'):
    pass

def sample_client(user):
    """Create and return a basic Client object"""
    pass


# NOT AUTHORIZED / PUBLIC ROUTES TEST (NOT LOGGED IN)
class PublicClientApiTests(TestCase):
    """
    Test the publicly available Clients API
    """

    def setUp(self):
        """Initial setup before running public tests"""
        self.client = APIClient()

    def test_login_required(self):
        """Test authentication required to interact with Client API"""
        # HTTP GET request
        res = self.client.get(CLIENTS_URL)
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


# AUTHORIZED / PRIVATE ROUTES TEST (LOGGED IN)
class PrivateClientApiTests(TestCase):
    """
    Test the private Clients API
    """

    def setUp(self):
        """Initial setup before running private tests"""
        self.user = get_user_model().objects.create_user('test@email.com', 'password')
        self.client = APIClient()
        self.client.force_authenticate(self.user)

    def test_retrieve_clients(self):
        """Test retrieving list of Client objects (No Company or Logs)"""
        Client.objects.create(
            user=self.user,
            first_name='Bill',
            last_name='Gates',
            email='billgates@microsoft.com',
            phone_number='555-222-3333',
            job_title='CEO',
            notes='Goes by Billy Gatesworth'
        )
        Client.objects.create(
            user=self.user,
            first_name='Jeff',
            last_name='Bezos',
            email='jeffbezos@amazon.com',
            phone_number='333-124-5993',
            job_title='Ruler',
            notes='Global takeover of Whole Foods'
        )
        # HTTP GET request
        res = self.client.get(CLIENTS_URL)
        clients = Client.objects.all()
        serializer = ClientSerializer(clients, many=True)
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_retrieve_client_limited_to_user(self):
        """Test retrieving Client objects for ONLY logged in User"""
        pass




















