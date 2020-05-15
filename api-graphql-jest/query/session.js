import { gql } from 'apollo-boost'

const sessionFragment = gql`
  fragment SessionFragment on Session {
    id
    title
    createdAt
    description
    voteNum
    hero
    creator {
      nickname
      avatarUrl
      email
      openId
    }
    voteInfo {
      voteUsers {
        nickname
        avatarUrl
        email
      }
      isVote
    }
  }
`

export const getSessionDetailGql = gql`
  query($sessionId: Int!) {
    session(id: $sessionId) {
      ...SessionFragment
    }
  }
  ${sessionFragment}
`

export const voteSessionGql = gql`
  mutation($sessionId: Int!) {
    addOneVoteNum(sessionId: $sessionId)
  }
`

export const cancelVoteSessionGql = gql`
  mutation($sessionId: Int!) {
    deleteOneVoteNum(sessionId: $sessionId)
  }
`
