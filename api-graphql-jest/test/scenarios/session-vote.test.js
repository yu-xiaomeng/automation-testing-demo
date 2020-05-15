import {client} from "../support/request"
import {getSessionDetailGql, voteSessionGql, cancelVoteSessionGql} from '../../query/session'

describe("场景1: 我查看别人发的话题征集，先点想听然后取消想听", () => {
    const sessionId = 20

    it("我查看话题征集“qwr1”", async () => {
        const sessionDetail = await client.query({
            query: getSessionDetailGql,
            variables: {
                "sessionId": sessionId
            }
        })
        expect(sessionDetail.data.session.creator.openId).toBe("myopenid")
        expect(sessionDetail.data.session.title).toBe("qwr1")
    })

    it("我点击想听", async () => {
        const res = await client.mutate({
            mutation: voteSessionGql,
            variables: {
                "sessionId": sessionId
            }
        })
        expect(res.data.addOneVoteNum).toBeTruthy()
    })

    it("然后我又取消想听", async () => {
        const res = await client.mutate({
            mutation: cancelVoteSessionGql,
            variables: {
                "sessionId": sessionId
            }
        })
        expect(res.data.deleteOneVoteNum).toBeTruthy()
    })
})