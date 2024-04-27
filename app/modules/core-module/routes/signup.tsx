import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import lodash from "lodash";
import * as React from "react";

import {
  createUser,
  getUserByEmail,
} from "~/modules/core-module/models/user.server";
import { sendEmail } from "~/server/utils/EmailUtil.server";
import { getUserId } from "~/session.server";
import TErrorObject from "~/types/errors/TErrorObject";
import { validateEmail } from "~/utils";

const { get } = lodash;
export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const storeName = formData.get("storeName") as string;
  const slug = formData.get("slug") as string;
  const secret = formData.get("secret") as string;
  // const redirectTo = safeRedirect(formData.get("redirectTo"), "/");

  const errors = [];
  if (typeof secret !== "string" || secret.length === 0) {
    errors.push({ field: "secret", message: "Secret is required." });
  }
  if (typeof firstName !== "string" || firstName.length === 0) {
    errors.push({ field: "firstName", message: "First Name is required." });
  }
  if (typeof lastName !== "string" || lastName.length === 0) {
    errors.push({ field: "lastName", message: "Last Name is required." });
  }
  if (!validateEmail(email)) {
    errors.push({ field: "email", message: "Email is invalid." });
  }

  if (
    password === null ||
    typeof password !== "string" ||
    password.length === 0
  ) {
    errors.push({ field: "password", message: "Password is required." });
  } else if (password.length < 8) {
    errors.push({ field: "password", message: "Password is too short" });
  }

  if (typeof slug !== "string" || slug.length === 0) {
    errors.push({ field: "slug", message: "Slug is required." });
  }
  if (errors.length > 0) {
    const errorObject: TErrorObject = {};
    errors.map((entry) => {
      errorObject[entry.field] = entry.message;
    });
    return json({ errors: errorObject }, { status: 400 });
  }
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return json(
      {
        errors: {
          email: "A user already exists with this email",
          password: null,
        },
      },
      { status: 400 },
    );
  }
  if (secret !== "iloveoneapp") {
    return json(
      {
        errors: {
          secret: "Secret is wrong",
        },
      },
      { status: 400 },
    );
  }
  const user = await createUser(
    email,
    password,
    firstName,
    lastName,
    storeName,
    slug + "." + process.env.DOMAIN,
  );
  if (user && user.verificationCode) {
    await sendEmail(
      user.email,
      "Verify your account",
      `<html><body>Hi ${user.firstName}, <br/><br/>Thank you for Registering with us.<br/>
        <a href="${process.env.HOST_URL}verify/${user.verificationCode}">Please click here to verify</a>
      </body></html>`,
    );
  }
  return redirect("/verify", {});

  // return createUserSession({
  //   request,
  //   userId: user.id,
  //   remember: false,
  //   redirectTo,
  // });
}

export const meta: MetaFunction = () => {
  return [
    {
      title: "Sign Up",
    },
  ];
};

export default function Join() {
  const actionData = useActionData<typeof action>();
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="flex min-h-full flex-col justify-center">
      <>
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="border bg-white px-4 py-8 sm:rounded-lg sm:px-10">
              <div className="mb-5 sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-lg font-bold tracking-tight text-gray-500">
                  Enter your details to register
                </h2>
              </div>
              <Form className="space-y-6" action="#" method="POST">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="firstName"
                      required
                      // eslint-disable-next-line jsx-a11y/no-autofocus
                      autoFocus={true}
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      aria-invalid={
                        get(actionData, "errors.firstName") ? true : undefined
                      }
                      aria-describedby="firstName-error"
                      className="w-full rounded border border-gray-500 px-2 py-1 text-lg focus:border-main-400 focus:outline-none focus:ring-main-400"
                    />
                    {get(actionData, "errors.firstName") ? (
                      <div className="pt-1 text-red-700" id="firstName-error">
                        {get(actionData, "errors.firstName")}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="lastName"
                      required
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      className="w-full rounded border border-gray-500 px-2 py-1 text-lg focus:border-main-400 focus:outline-none focus:ring-main-400"
                    />
                    {get(actionData, "errors.lastName") ? (
                      <div className="pt-1 text-red-700" id="lastName-error">
                        {get(actionData, "errors.lastName")}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      ref={emailRef}
                      id="email"
                      required
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="w-full rounded border border-gray-500 px-2 py-1 text-lg focus:border-main-400 focus:outline-none focus:ring-main-400"
                    />
                    {actionData?.errors?.email ? (
                      <div className="pt-1 text-red-700" id="email-error">
                        {actionData.errors.email}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      ref={passwordRef}
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      className="w-full rounded border border-gray-500 px-2 py-1 text-lg focus:border-main-400 focus:outline-none focus:ring-main-400"
                    />
                    {actionData?.errors?.password ? (
                      <div className="pt-1 text-red-700" id="password-error">
                        {actionData.errors.password}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="storeName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Company Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="storeName"
                      required
                      name="storeName"
                      type="text"
                      className="w-full rounded border border-gray-500 px-2 py-1 text-lg focus:border-main-400 focus:outline-none focus:ring-main-400"
                    />
                    {get(actionData, "errors?.storeName") ? (
                      <div className="pt-1 text-red-700" id="storeName-error">
                        {get(actionData, "errors.storeName")}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="slug"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Subdomain
                  </label>
                  <div className="mt-2">
                    <input
                      id="slug"
                      required
                      name="slug"
                      type="text"
                      className="w-full rounded border border-gray-500 px-2 py-1 text-lg focus:border-main-400 focus:outline-none focus:ring-main-400"
                    />
                    {get(actionData, "errors.slug") ? (
                      <div className="pt-1 text-red-700" id="slug-error">
                        {get(actionData, "errors.slug")}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="slug"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Secret Key
                  </label>
                  <div className="mt-2">
                    <input
                      id="secret"
                      required
                      name="secret"
                      type="text"
                      className="w-full rounded border border-gray-500 px-2 py-1 text-lg focus:border-main-400 focus:outline-none focus:ring-main-400"
                    />
                    {get(actionData, "errors.slug") ? (
                      <div className="pt-1 text-red-700" id="slug-error">
                        {get(actionData, "errors.slug")}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-main-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-main-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-400"
                  >
                    Register
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
