export const ADD_PERSON = `
mutation createPerson(  $name: String!,
                        $alternative:String,
                        $other_names:String,
                        $identifiers:String
                        $email:String,
                        $gender:String,
                        $birth_date:String,
                        $death_date:String,
                        $summary:String
                        $biography:String
                        $national_identity:String
                        $contact_details:String
                        $links:String
                        $source:String

             
  ) {
    createPerson(data: {  name:$name,
                          alternative:$alternative,
                          other_names:$other_names,
                          identifiers:$identifiers
                          email,:$email,
                          gender:$gender,
                          birth_date:$birth_date
                          death_date:$death_date
                          summary:$summary
                          biography:$biography
                          national_identity:$national_identity
                          contact_details:$contact_details
                          links:$links
                          source:$source
                
    }) {
          name
          alternative
          other_names
          identifiers
          email
          gender
          birth_date
          death_date
          summary
          biography
          national_identity
          contact_details
          links
          source

  }
}
`;
// $birth_date:String,$death_date:String,$image:String,$summary:String,$biography:String,$national_identity:String,
// birth_date:$birth_date,death_date:$death_date,image:$image,summary:$summary,biography:$biography,national_identity:$national_identity

// death_date
// image
// summary
// biography
// national_identity

export const ADD_ORGANIZATION = `
mutation createOrganization(  $name: String!,
                              $alternative_name:String,
                              $identifiers:String
                              $classification:String,
                             
                              $abstract:String,
                              $description:String,
                              $founding_date:DateTime,
                              $dissolution_date:DateTime,
                              $image:String,
                              $contact_details:String,
                              $links:String,
                              $speeches:String,


) {
  createOrganization(data: {  name:$name,
                              alternative_name:$alternative_name,
                              identifiers:$identifiers
                              classification:$classification,
                             
                              abstract:$abstract,
                              description:$description,
                              founding_date:$founding_date,
                              dissolution_date:$dissolution_date,
                              image:$image,
                              contact_details:$contact_details,
                              links:$links,
                              speeches:$speeches,

}) {
          name
          alternative_name
          identifiers
          classification
         
          abstract
          description
          founding_date
          dissolution_date
          image
          contact_details
          links
          speeches
  }
}
`;
// $parent:String,
// $children:String,
