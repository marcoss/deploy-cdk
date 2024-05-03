# Deploy CDK

State: Working

## Prerequisites

1. Create a [GitHub access token](https://github.com/settings/tokens/new)

2. Add GitHub token secret to SSM using the AWS CLI:

```
aws ssm put-parameter --name "/AssetDeploy/insecure_github_token" --value "secret" --type String --overwrite
```

> **Note:** This stores the API token key in plaintext inside AWS SSM, which is NOT recommended if you have multiple users with console or API access to your AWS account. Consider using AWS Secrets Manager.

## Instructions

1. `cdk bootstrap`
2. `cdk deploy`
