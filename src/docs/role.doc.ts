import responses from "./response.doc";

export const role = {
  "/admin/assign-role": {
    post: {
      tags: ["Role"],
      summary: "Grant role",
      description: "grand loan permissions to users",
      operationId: "grantRole",
      security: [
        {
          JWT: [],
        },
      ],
      parameters: [
        {
          name: "body",
          in: "body",
          description: "deposity amount",
          required: true,
          schema: {
            $ref: "#/definitions/role",
          },
        },
      ],
      responses,
    },
  },
};

export const roleDefinitions = {
  role: {
    type: "object",
    properties: {
      userId: {
        type: "number",
        require: true,
      },
      loanId: {
        type: "number",
        require: true,
      },
    },
  },
};
