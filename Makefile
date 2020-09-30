ifndef ENV
$(error ENV is not set)
endif

export AWS_DEFAULT_REGION=eu-west-1
export AWS_SDK_LOAD_CONFIG=1
export AWS_PROFILE=patrwm-$(ENV)

deploy:
	serverless deploy

remove:
	serverless remove

create_domain:
	serverless create_domain

delete_domain:
	serverless delete_domain	

config:
	serverless config