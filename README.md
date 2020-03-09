# Generate Receipt

Serverless shopping cart receipt generator service using [NodeJS](https://nodejs.org),
[Typescript](https://www.typescriptlang.org/) and the [serverless framework](https://serverless.com/).

## Installation

As of the last update on this repo this AWS lambda requires [NodeJS](https://nodejs.org) 12.16.1 LTS and the corresponding npm 6.13.4 version that accompanies it. Once you have NodeJS and npm installed for your platform, we can then move onto installing the npm module dependencies. You can learn more about installing NodeJS and npm from the main [NodeJS website](https://nodejs.org) which typically features a download link for your platform for both LTS and Current versions.

### Intalling the Serverless framework

Next we want to install the Serverles framework globally using the `npm` command as shown below.

```
npm install -g serverless
```

### Install Project Dependencies

To install the project dependencies including Typescript and others simply run the follow `npm` command:

```
npm install
```

This may output some warnings like the following (depending on your platform), but they can be ignored:
```
  SOLINK_MODULE(target) Release/.node
ld: warning: directory not found for option '-L/usr/local/opt/node@12/lib:'
  CXX(target) Release/obj.target/fse/fsevents.o
  SOLINK_MODULE(target) Release/fse.node
ld: warning: directory not found for option '-L/usr/local/opt/node@12/lib:'
npm WARN generate-receipt@1.0.0 No repository field.
```

### Configure Serverless Framework AWS Credentials

Technically speaking, the service is fully functional and deployable. However, before deploying the service, AWS credentials must be configured. To configure AWS credentials for Serverless, start by creating an IAM user for Serverless to use:

1. Login to AWS and navigate to IAM
2. Create a new user called `serverless-admin`
3. Give `serverless-admin` Programatic access
4. Attach the `AdministratorAccess` policy

Next, copy the Access key ID and Secret access key to your clipboard for use in your Serverless Framework configuration. Configure the Serverless Framework with your access keys using the serverless config credentials command:

```
$ serverless config credentials --provider aws --key  --secret wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY --profile serverless-admin
Serverless: Setting up AWS...
Serverless: Saving your AWS profile in "~/.aws/credentials"...
Serverless: Success! Your AWS access keys were stored under the "serverless-admin" profile.
```

It’s important to pass the `--profile` argument here so that you do not override your `[default]` AWS credentials. To ensure Serverless uses this profile for deployment, update the `provider.profile` in `serverless.yml` with the profile name:

```
profile: serverless-admin
```

Of course, you can name the profile anything you want but generally speaking you probably do not want the serverless profile to be the default, since that is what is used for the AWS CLI.

You should now be ready to deploy the lambda with the following serverless command:
```
serverless deploy -v
```
or for a shoter less verbose version run:
```
sls deploy
```

## Running the Unit Tests

Once all dependenies are installed running the unit tests is as simple as running:
```
npm test
```

## Live Testing With Postman

After you have deployed your lambda you can test it with Postman using this [collection](postman/Generate_Receipt.postman_collection.json). You most likely will have to update the URLs used in the Requests to match the deployed urls for your lambda(s).
