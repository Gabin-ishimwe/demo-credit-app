import responses from "./response.doc";

export const user = {
  // @ts-ignore
  "/auth/register": {
    post: {
      tags: ["User"],
      summary: "Register",
      description: "Register a user",
      operationId: "postUsersRegister",
      parameters: [
        {
          name: "body",
          in: "body",
          description: "Register a user",
          required: true,
          schema: {
            $ref: "#/definitions/register",
          },
        },
      ],
      responses,
    },
  },
  // @ts-ignore
  "/auth/login": {
    post: {
      tags: ["User"],
      summary: "Login",
      description: "Login a user",
      operationId: "postUsersLogin",
      parameters: [
        {
          name: "body",
          in: "body",
          description: "Login a user",
          required: true,
          schema: {
            $ref: "#/definitions/login",
          },
        },
      ],
      responses,
    },
  },
};

export const userDefinitions = {
  register: {
    type: "object",
    properties: {
      firstName: {
        type: "string",
        required: true,
      },
      lastName: {
        type: "string",
        required: true,
      },
      email: {
        type: "string",
        required: true,
      },
      password: {
        type: "string",
        required: true,
      },
    },
  },

  login: {
    type: "object",
    properties: {
      email: {
        type: "string",
        required: true,
      },
      password: {
        type: "string",
        required: true,
      },
    },
  },
};
