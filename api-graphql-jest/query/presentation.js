import { gql } from 'apollo-boost'

export const createPresentationGql = gql`
  mutation(
    $sessionId: Int
    $title: String!
    $description: String!
    $presenter: String!
    $presentationStartDate: String
    $presentationEndDate: String
    $offlinePresentation: String
    $onlinePresentation: String
    $teamId: Int!
    $orderMealDeadline: String
  ) {
    createPresentation(
      input: {
        sessionId: $sessionId
        title: $title
        description: $description
        presenter: $presenter
        presentationStartDate: $presentationStartDate
        presentationEndDate: $presentationEndDate
        offlinePresentation: $offlinePresentation
        onlinePresentation: $onlinePresentation
        teamId: $teamId
        orderMealDeadline: $orderMealDeadline
      }
    ) {
      id
    }
  }
`
