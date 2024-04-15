# ReferenceError: Cannot access 'UserType' before initialization graphql stackoverflow

solved by closer -> this execute a code when whole code has executed
fields: () => ({})

npm i --save express express-graphql graphql lodash

# query

{
  user(id: "1") {
    id
    firstName
    age
    company {
      id
      name
      description
    }
    users {
      id
      firstName
      age
    }
  }
}

/* ----------------- */

{
  company(id: "1") {
    id
    name
    description
    users {
      id
      firstName
      age
    }
  }
}

/* ----------------- */

query AllUserRelatedToCompany {
  company(id: "1") {
    id
    name
    description
    users {
      id
      firstName
      age
    }
  }
}

/* ----------------- */

query AllUserRelatedToCompany {
  c1: company(id: "1") {
    id
    name
    description
    users {
      id
      firstName
      age
    }
  }
  c2: company(id: "2") {
    id
    name
    description
    users {
      id
      firstName
      age
    }
  }
}

/* ----------------- */

query AllUserRelatedToCompany {
  c1: company(id: "1") {
    ...companyDetails
  }
  c2: company(id: "2") {
    ...companyDetails
  }
}

fragment companyDetails on Company {
  id
  name
  description
  users {
    id
    firstName
    age
  }
}

/* ----------------- */

query AllUserRelatedToCompany {
  c1: company(id: "1") {
    ...companyDetails
  }
  c2: company(id: "2") {
    ...companyDetails
  }
}

fragment companyDetails on Company {
  id
  name
  description
  users {
    ...userDetails
  }
}

fragment userDetails on User {
  id
  firstName
  age
}