import responses from "./response.doc";

export const lender = {
  "/lender": {
    post: {
      tags: ["Lender"],
      summary: "Create lender offer",
      description: "creating lender offer",
      operationId: "createLenderOffer",
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
            $ref: "#/definitions/lender",
          },
        },
      ],
      responses,
    },
    get: {
      tags: ["Lender"],
      summary: "Get lender offer",
      description: "Get all lender offer",
      operationId: "getLenderOffer",
      security: [
        {
          JWT: [],
        },
      ],
      responses,
    },
  },
  "/lender/:id": {
    patch: {
      tags: ["Lender"],
      summary: "Update lender offer",
      description: "Update lender offer",
      operationId: "updateLenderOffer",
      security: [
        {
          JWT: [],
        },
      ],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "lender id",
          require: true,
        },
        {
          name: "body",
          in: "body",
          description: "deposity amount",
          required: true,
          schema: {
            $ref: "#/definitions/lender",
          },
        },
      ],
      responses,
    },
    get: {
      tags: ["Lender"],
      summary: "Get one lender offer",
      description: "Get one lender offer",
      operationId: "getoneLenderOffer",
      security: [
        {
          JWT: [],
        },
      ],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "lender id",
          require: true,
        },
      ],
      responses,
    },
  },
};

export const lenderDefinitions = {
  lender: {
    type: "object",
    properties: {
      loanType: {
        type: "string",
        required: true,
      },
      interestRate: {
        type: "number",
        required: true,
      },
      paymentPeriod: {
        type: "number",
        required: true,
      },
      amountOffered: {
        type: "number",
        required: true,
      },
      status: {
        type: "string",
        require: true,
      },
    },
  },
};
