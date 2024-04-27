export default {
  "SequenceId": {
    "name": "SequenceId",
    "dbName": null,
    "fields": {
      "id": {
        "name": "id",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": true,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "String",
        "default": {
          "name": "cuid",
          "args": []
        },
        "isGenerated": false,
        "isUpdatedAt": false,
        "customAttribute": {}
      },
      "model": {
        "name": "model",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "String",
        "isGenerated": false,
        "isUpdatedAt": false,
        "customAttribute": {}
      },
      "value": {
        "name": "value",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "Int",
        "default": 1,
        "isGenerated": false,
        "isUpdatedAt": false,
        "customAttribute": {}
      },
      "company": {
        "name": "company",
        "kind": "object",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Company",
        "relationName": "CompanyToSequenceId",
        "relationFromFields": [
          "companyId"
        ],
        "relationToFields": [
          "id"
        ],
        "isGenerated": false,
        "isUpdatedAt": false,
        "customAttribute": {}
      },
      "companyId": {
        "name": "companyId",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": true,
        "hasDefaultValue": false,
        "type": "String",
        "isGenerated": false,
        "isUpdatedAt": false,
        "customAttribute": {}
      }
    },
    "primaryKey": null,
    "uniqueFields": [
      [
        "companyId",
        "model"
      ]
    ],
    "uniqueIndexes": [
      {
        "name": null,
        "fields": [
          "companyId",
          "model"
        ]
      }
    ],
    "isGenerated": false,
    "customAttribute": {}
  },
  "Company": {
    "name": "Company",
    "dbName": null,
    "fields": {
      "id": {
        "name": "id",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": true,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "String",
        "default": {
          "name": "cuid",
          "args": []
        },
        "isGenerated": false,
        "isUpdatedAt": false,
        "customAttribute": {}
      },
      "name": {
        "name": "name",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": true,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "String",
        "isGenerated": false,
        "isUpdatedAt": false,
        "documentation": "{\"label\": \"Name\"}",
        "customAttribute": {
          "label": "Name"
        }
      },
      "slug": {
        "name": "slug",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": true,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "String",
        "default": "",
        "isGenerated": false,
        "isUpdatedAt": false,
        "customAttribute": {}
      },
      "SequenceId": {
        "name": "SequenceId",
        "kind": "object",
        "isList": true,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "SequenceId",
        "relationName": "CompanyToSequenceId",
        "relationFromFields": [],
        "relationToFields": [],
        "isGenerated": false,
        "isUpdatedAt": false,
        "customAttribute": {}
      },
      "User": {
        "name": "User",
        "kind": "object",
        "isList": true,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "User",
        "relationName": "CompanyToUser",
        "relationFromFields": [],
        "relationToFields": [],
        "isGenerated": false,
        "isUpdatedAt": false,
        "customAttribute": {}
      }
    },
    "primaryKey": null,
    "uniqueFields": [],
    "uniqueIndexes": [],
    "isGenerated": false,
    "customAttribute": {}
  },
  "User": {
    "name": "User",
    "dbName": null,
    "fields": {
      "id": {
        "name": "id",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": true,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "String",
        "default": {
          "name": "cuid",
          "args": []
        },
        "isGenerated": false,
        "isUpdatedAt": false,
        "customAttribute": {}
      },
      "firstName": {
        "name": "firstName",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "String",
        "isGenerated": false,
        "isUpdatedAt": false,
        "documentation": "{\"label\": \"First Name\"}",
        "customAttribute": {
          "label": "First Name"
        }
      },
      "lastName": {
        "name": "lastName",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "String",
        "isGenerated": false,
        "isUpdatedAt": false,
        "documentation": "{\"label\": \"Last Name\"}",
        "customAttribute": {
          "label": "Last Name"
        }
      },
      "email": {
        "name": "email",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": true,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "String",
        "isGenerated": false,
        "isUpdatedAt": false,
        "documentation": "{\"label\": \"Email\", \"fieldType\": \"email\"}",
        "customAttribute": {
          "label": "Email",
          "fieldType": "email"
        }
      },
      "createdAt": {
        "name": "createdAt",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "DateTime",
        "default": {
          "name": "now",
          "args": []
        },
        "isGenerated": false,
        "isUpdatedAt": false,
        "customAttribute": {}
      },
      "updatedAt": {
        "name": "updatedAt",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "DateTime",
        "isGenerated": false,
        "isUpdatedAt": true,
        "customAttribute": {}
      },
      "password": {
        "name": "password",
        "kind": "object",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Password",
        "relationName": "PasswordToUser",
        "relationFromFields": [],
        "relationToFields": [],
        "isGenerated": false,
        "isUpdatedAt": false,
        "customAttribute": {}
      },
      "role": {
        "name": "role",
        "kind": "enum",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "Role",
        "default": "MERCHANT",
        "isGenerated": false,
        "isUpdatedAt": false,
        "customAttribute": {}
      },
      "isVerified": {
        "name": "isVerified",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "Boolean",
        "default": false,
        "isGenerated": false,
        "isUpdatedAt": false,
        "customAttribute": {}
      },
      "verificationCode": {
        "name": "verificationCode",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "String",
        "default": "_________",
        "isGenerated": false,
        "isUpdatedAt": false,
        "customAttribute": {}
      },
      "verificationShortCode": {
        "name": "verificationShortCode",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "String",
        "isGenerated": false,
        "isUpdatedAt": false,
        "documentation": "{\"label\": \"Sign up code\"}",
        "customAttribute": {
          "label": "Sign up code"
        }
      },
      "isProfileComplete": {
        "name": "isProfileComplete",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "Boolean",
        "default": false,
        "isGenerated": false,
        "isUpdatedAt": false,
        "customAttribute": {}
      },
      "onboardingFarthestStep": {
        "name": "onboardingFarthestStep",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "Int",
        "default": 1,
        "isGenerated": false,
        "isUpdatedAt": false,
        "customAttribute": {}
      },
      "primaryCompany": {
        "name": "primaryCompany",
        "kind": "object",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "Company",
        "relationName": "CompanyToUser",
        "relationFromFields": [
          "primaryCompanyId"
        ],
        "relationToFields": [
          "id"
        ],
        "isGenerated": false,
        "isUpdatedAt": false,
        "customAttribute": {}
      },
      "primaryCompanyId": {
        "name": "primaryCompanyId",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": true,
        "hasDefaultValue": false,
        "type": "String",
        "isGenerated": false,
        "isUpdatedAt": false,
        "customAttribute": {}
      },
      "FileUpload": {
        "name": "FileUpload",
        "kind": "object",
        "isList": true,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "FileUpload",
        "relationName": "FileUploadToUser",
        "relationFromFields": [],
        "relationToFields": [],
        "isGenerated": false,
        "isUpdatedAt": false,
        "customAttribute": {}
      }
    },
    "primaryKey": null,
    "uniqueFields": [],
    "uniqueIndexes": [],
    "isGenerated": false,
    "customAttribute": {}
  },
  "Password": {
    "name": "Password",
    "dbName": null,
    "fields": {
      "hash": {
        "name": "hash",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "String",
        "isGenerated": false,
        "isUpdatedAt": false,
        "customAttribute": {}
      },
      "user": {
        "name": "user",
        "kind": "object",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "User",
        "relationName": "PasswordToUser",
        "relationFromFields": [
          "userId"
        ],
        "relationToFields": [
          "id"
        ],
        "relationOnDelete": "Cascade",
        "isGenerated": false,
        "isUpdatedAt": false,
        "customAttribute": {}
      },
      "userId": {
        "name": "userId",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": true,
        "isId": false,
        "isReadOnly": true,
        "hasDefaultValue": false,
        "type": "String",
        "isGenerated": false,
        "isUpdatedAt": false,
        "customAttribute": {}
      }
    },
    "primaryKey": null,
    "uniqueFields": [],
    "uniqueIndexes": [],
    "isGenerated": false,
    "customAttribute": {}
  },
  "FileUpload": {
    "name": "FileUpload",
    "dbName": null,
    "fields": {
      "id": {
        "name": "id",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": true,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "String",
        "default": {
          "name": "uuid",
          "args": []
        },
        "isGenerated": false,
        "isUpdatedAt": false,
        "customAttribute": {}
      },
      "path": {
        "name": "path",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "String",
        "isGenerated": false,
        "isUpdatedAt": false,
        "customAttribute": {}
      },
      "originalFileName": {
        "name": "originalFileName",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "String",
        "isGenerated": false,
        "isUpdatedAt": false,
        "customAttribute": {}
      },
      "user": {
        "name": "user",
        "kind": "object",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "User",
        "relationName": "FileUploadToUser",
        "relationFromFields": [
          "userId"
        ],
        "relationToFields": [
          "id"
        ],
        "isGenerated": false,
        "isUpdatedAt": false,
        "customAttribute": {}
      },
      "userId": {
        "name": "userId",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": true,
        "hasDefaultValue": false,
        "type": "String",
        "isGenerated": false,
        "isUpdatedAt": false,
        "customAttribute": {}
      },
      "companyId": {
        "name": "companyId",
        "kind": "scalar",
        "isList": false,
        "isRequired": false,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "String",
        "isGenerated": false,
        "isUpdatedAt": false,
        "customAttribute": {}
      },
      "createdAt": {
        "name": "createdAt",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "DateTime",
        "default": {
          "name": "now",
          "args": []
        },
        "isGenerated": false,
        "isUpdatedAt": false,
        "customAttribute": {}
      },
      "updatedAt": {
        "name": "updatedAt",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "DateTime",
        "default": {
          "name": "now",
          "args": []
        },
        "isGenerated": false,
        "isUpdatedAt": true,
        "customAttribute": {}
      }
    },
    "primaryKey": null,
    "uniqueFields": [],
    "uniqueIndexes": [],
    "isGenerated": false,
    "customAttribute": {}
  },
  "initDb": {
    "name": "initDb",
    "dbName": null,
    "fields": {
      "id": {
        "name": "id",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": true,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "String",
        "default": {
          "name": "uuid",
          "args": []
        },
        "isGenerated": false,
        "isUpdatedAt": false,
        "customAttribute": {}
      },
      "createdAt": {
        "name": "createdAt",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "DateTime",
        "default": {
          "name": "now",
          "args": []
        },
        "isGenerated": false,
        "isUpdatedAt": false,
        "customAttribute": {}
      },
      "updatedAt": {
        "name": "updatedAt",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "DateTime",
        "default": {
          "name": "now",
          "args": []
        },
        "isGenerated": false,
        "isUpdatedAt": true,
        "customAttribute": {}
      },
      "name": {
        "name": "name",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "String",
        "isGenerated": false,
        "isUpdatedAt": false,
        "customAttribute": {}
      }
    },
    "primaryKey": null,
    "uniqueFields": [],
    "uniqueIndexes": [],
    "isGenerated": false,
    "customAttribute": {}
  }
}