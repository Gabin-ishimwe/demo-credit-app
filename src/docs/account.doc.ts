import responses from "./response.doc";

export const account = {
  // @ts-ignore
  "/account/deposit": {
    post: {
      tags: ["Account"],
      summary: "Deposit amount on account",
      description: "Deposit amount on account",
      operationId: "depositMoney",
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
            $ref: "#/definitions/deposit",
          },
        },
      ],
      responses,
    },
  },
  // @ts-ignore
  "/account/widthraw": {
    post: {
      tags: ["Account"],
      summary: "widthraw amount on account",
      description: "widthraw amount on account",
      operationId: "widthrawMoney",
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
            $ref: "#/definitions/deposit",
          },
        },
      ],
      responses,
    },
  },
  // @ts-ignore
  "/account/pay-loan": {
    post: {
      tags: ["Account"],
      summary: "Pay loan",
      description: "pay loan money",
      operationId: "payLoanMoney",
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
            $ref: "#/definitions/payLoan",
          },
        },
      ],
      responses,
    },
  },
};

export const accountDefinitions = {
  deposit: {
    type: "object",
    properties: {
      amount: {
        type: "number",
        required: true,
      },
    },
  },
  payLoan: {
    type: "object",
    properties: {
      amount: {
        type: "number",
        required: true,
      },
      loanId: {
        type: "number",
        required: true,
      },
    },
  },
};
