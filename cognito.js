const aws = require('aws-sdk');
const { fromSSO } = require('@aws-sdk/credential-provider-sso');
const credentials = await fromSSO({ profile: 'AdministratorAccess-xxx' })();

aws.config.update({
  region: 'us-east-1',
  credentials,
});

const cognito = new aws.CognitoIdentityServiceProvider({
  apiVersion: '2016-04-18',
});

const createCognitoUser = async (email, password, userPoolId, groupName = null) => {
  await cognito
    .adminCreateUser({
      UserPoolId: userPoolId,
      Username: email,
      UserAttributes: [
        {
          Name: 'email',
          Value: email,
        },
        {
          Name: 'email_verified',
          Value: 'true',
        },
      ],
    })
    .promise();

  await cognito
    .adminSetUserPassword({
      Password: password,
      UserPoolId: userPoolId,
      Username: email,
      Permanent: true,
    })
    .promise();

  if (groupName) {
    await cognito
      .adminAddUserToGroup({
        GroupName: groupName,
        UserPoolId: userPoolId,
        Username: email,
      })
      .promise();
  }
};

createCognitoUser('email@address.com', 'somePassword', 'ADMINS', 'us-east-1_xxx');
