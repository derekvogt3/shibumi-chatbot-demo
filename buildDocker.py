import yaml

import argparse


parser = argparse.ArgumentParser(description="A simple command-line program")
parser.add_argument('--all', action='store_true')
args = parser.parse_args()

def generate_docker_compose(run_in_docker):
    services = {
        'version': '3',
        'services': {
            'db': {
                'image': 'postgres:13',
                'volumes': ['./data/db:/var/lib/postgresql/data'],
                'environment': {
                    'POSTGRES_DB': 'mydatabase',
                    'POSTGRES_USER': 'myuser',
                    'POSTGRES_PASSWORD': 'mypassword'
                }
            },
        }
    }

    if run_in_docker:
        services['services']['backend'] = {
            'build': {
                'context': './backend',
                'dockerfile': 'Dockerfile'
            },
            'ports': ['5050:5050'],
            'depends_on': ['db'],
            'volumes': ['./backend:/app']
        }
        services['services']['frontend'] = {
            'build': {
                'context': './frontend',
                'dockerfile': 'Dockerfile'
            },
            'ports': ['3000:3000'],
            'volumes': ['./frontend:/app']
        }

    with open('docker-compose.yml', 'w') as f:
        yaml.dump(services, f)

if __name__ == "__main__":
    run_in_docker = args.all
    generate_docker_compose(run_in_docker)
