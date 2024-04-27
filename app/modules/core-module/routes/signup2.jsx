import {FormProvider, useForm} from "react-hook-form";
import {DynamicForm} from "~/components/dynamicComponents/DynamicForms/DynamicForm";
import {getModelDefinition} from "~/server/utils/ModelUtils.server";
import {useToast} from "~/components/ui/use-toast";
import {useActionData, useLoaderData} from "@remix-run/react";
import {redirect} from '@remix-run/node';
import {DynamicFieldAction} from "~/components/dynamicComponents/DynamicForms/DynamicFormAction";
import {signupUser} from '../models/user.server';
import {sendEmail} from '~/server/utils/EmailUtil.server';
const fields = [["email"], ["passwordField"], ["repasswordField"], ['inviteKey']];
const customPasswordFields = {
  passwordField: {
    name: "passwordField",
    kind: "scalar",
    isList: false,
    isRequired: true,
    isUnique: true,
    isId: false,
    isReadOnly: false,
    hasDefaultValue: false,
    type: "String",
    isGenerated: false,
    isUpdatedAt: false,
    documentation: '{"label": "Password", "fieldType": "password"}',
    customAttribute: {
      label: "Password",
      fieldType: "password",
    },
  },
  repasswordField: {
    name: "repasswordField",
    kind: "scalar",
    isList: false,
    isRequired: true,
    isUnique: true,
    isId: false,
    isReadOnly: false,
    hasDefaultValue: false,
    type: "String",
    isGenerated: false,
    isUpdatedAt: false,
    documentation:
      '{"label": "Retype Password", "fieldType": "password"}',
    customAttribute: {
      label: "Retype Password",
      fieldType: "password",
    },
  },
  inviteKey: {
    name: "invite key",
    kind: "scalar",
    isList: false,
    isRequired: true,
    isUnique: true,
    isId: false,
    isReadOnly: false,
    hasDefaultValue: false,
    type: "String",
    isGenerated: false,
    isUpdatedAt: false,
    documentation:
      '{"label": "Invite Key"}',
    customAttribute: {
      label: "Invite Key",
    },
  }
}
export const action = async (actionData) => {
  const UserModel = getModelDefinition("User");
  const result = await DynamicFieldAction(actionData, {
    modelName: "User",
    modelDefinition: {
      ...UserModel,
      fields: {
        ...UserModel.fields,
        ...customPasswordFields
      },
    },
    formFields: fields,
    onSubmit: async (data) => {
      if (data.passwordField !== data.repasswordField) {
        return {
          data: {
            errors: "Passwords do not match",
            fields: {email: data.email},
          },
        };
      }
      if (data.inviteKey !== 'iloveoneapp') {
        return {
          data: {
            errors: "Invite Key is invalid",
            fields: {email: data.email},
          },
        }
      }
      try {

        const user = await signupUser(
          data.email,
          data.passwordField,
        );


        if (user && user.verificationCode) {
          await sendEmail(
            user.email,
            "Verify your account",
            `<html><body>Hi ${user.firstName}, <br/><br/>Thank you for Registering with us.<br/>
                <a href="${process.env.HOST_URL}verify/${user.id}/${user.verificationCode}">Please click here to verify</a>
              </body></html>`,
          );
          return {data: redirect("/verify/" + user.id, {})};
        }
      } catch (exception) {
        console.error(exception);
      }

      return {
        data: {
          errors: "Email already taken.",
          fields: {email: data.email},
        },
      }

    }
  },);

  return result?.data;
};
export async function loader({request}) {
  const UserModel = getModelDefinition("User");
  return {modelDefinition: UserModel};
}

export default function Signup2() {
  const data = useActionData();
  const {toast} = useToast();
  const {modelDefinition} = useLoaderData();
  const formHook = useForm({
    defaultValues: {
      email: data?.fields?.email
    }
  });
  return (
    <div className="flex flex-col mt-32">
      <div className="sm:w-full sm:max-w-md mx-auto">

        <h1 className="mb-10 text-center">Sign up </h1>
        {data?.errors && <div className="text-center mb-5 text-red-500">{data.errors}</div>}
        <FormProvider {...formHook}>
          <DynamicForm
            modelName="User"
            modelDefinition={{
              ...modelDefinition,
              fields: {
                ...modelDefinition.fields,
                ...customPasswordFields
              },
            }}
            onSubmit={(data, formRef) => {
              if (data.passwordField !== data.repasswordField) {
                toast({
                  variant: "destructive",
                  title: "Password does not match.",
                  description: "Please make sure password match.",
                })
              } else {
                formRef.current.submit();
              }

            }}
            formFields={fields}
            formHook={formHook}
          />
        </FormProvider>
      </div>
    </div>
  );
}
