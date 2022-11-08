import responses from "./response.doc";

export const loan = {
  "/loan": {
    post: {
      tags: ["Loan"],
      summary: "Create Loan Application",
      description: "create loan application",
      operationId: "createloanApplication",
      security: [
        {
          JWT: [],
        },
      ],
      parameters: [
        {
          name: "body",
          in: "body",
          description: "loan application",
          required: true,
          schema: {
            $ref: "#/definitions/loanApplication",
          },
        },
      ],
      responses,
    },
    patch: {
      tags: ["Loan"],
      summary: "Respond Loan Application",
      description: "lender responding to loan application",
      operationId: "respondloanApplication",
      security: [
        {
          JWT: [],
        },
      ],
      parameters: [
        {
          name: "body",
          in: "body",
          description: "lender responding",
          required: true,
          schema: {
            $ref: "#/definitions/lenderResponse",
          },
        },
      ],
      responses,
    },
  },
  "/loan/:id": {
    patch: {
      tags: ["Loan"],
      summary: "Update Loan Application",
      description: "update loan application",
      operationId: "respondloanApplication",
      security: [
        {
          JWT: [],
        },
      ],
      parameters: [
        {
          name: "body",
          in: "body",
          description: "update loan application",
          required: true,
          schema: {
            $ref: "#/definitions/loanApplication",
          },
        },
      ],
      responses,
    },
  },
  "/loan/borrower/:id": {
    get: {
      tags: ["Loan"],
      summary: "Borrower Loan Application",
      description: "get one borrower's loan application",
      operationId: "borrowerApplication",
      security: [
        {
          JWT: [],
        },
      ],
      responses,
    },
  },
  "/loan/borrower": {
    get: {
      tags: ["Loan"],
      summary: "Borrower Loan Application",
      description: "get all borrower's loan application",
      operationId: "borrowerAllloanApplication",
      security: [
        {
          JWT: [],
        },
      ],
      responses,
    },
  },
  "/loan/lender": {
    get: {
      tags: ["Loan"],
      summary: "Lender Loan Application",
      description: "get all lender's loan application",
      operationId: "lenderAllloanApplication",
      security: [
        {
          JWT: [],
        },
      ],
      responses,
    },
  },
  "/loan/lender/:id": {
    get: {
      tags: ["Loan"],
      summary: "Lender Loan Application",
      description: "get all lender's loan application",
      operationId: "lenderloanApplication",
      security: [
        {
          JWT: [],
        },
      ],
      responses,
    },
  },
};

export const loanDefinitions = {
  loanApplication: {
    type: "object",
    properties: {
      amountRequested: {
        type: "number",
        required: true,
      },
      amountPayed: {
        type: "number",
        required: true,
      },
      lenderOfferId: {
        type: "number",
        required: true,
      },
      status: {
        type: "string",
        require: true,
      },
    },
  },
  lenderResponse: {
    type: "object",
    properties: {
      loanId: {
        type: "number",
        required: true,
      },
      status: {
        type: "string",
        required: true,
      },
    },
  },
};
