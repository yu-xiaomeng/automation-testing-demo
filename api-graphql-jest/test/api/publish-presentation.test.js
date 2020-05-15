import {client} from "../support/request"
import {createPresentationGql} from '../../query/presentation'

const teamId = 3
const now = new Date().getTime()
const oneHourAgo = new Date(Number(now)-3600000).getTime().toString()
const twoHoursAgo = new Date(Number(now)-7200000).getTime().toString()
const oneHourAfter = new Date(Number(now)+3600000).getTime().toString()
const twoHoursAfter = new Date(Number(now)+7200000).getTime().toString()

describe.each([
    // testDescription, title, presentationStartDate, presentationEndDate, orderMealDeadline
    ["只填写主题、描述和分享人，发布成功", "api test", "", "", "", 0],
    ["设置分享开始时间为现在之后1小时，发布成功", "api test", oneHourAfter, twoHoursAfter, "",0],
    ["设置分享开始时间为现在之前2小时，发布失败", "api test", twoHoursAgo, oneHourAgo, "", "GraphQL error: start date should be later then now"],
    ["启用订餐，订餐截止时间晚于分享开始时间，发布失败", "api test", oneHourAfter, twoHoursAfter, twoHoursAfter, "GraphQL error: order meal deadline should be earlier than start date"],
])("发布我要分享时，", (testDescription,title, startDate, endDate, orderMealDeadline, expected) => {
    
    it(`${testDescription}`, async () => {
        try{
            const res = await client.mutate({
                mutation: createPresentationGql,
                variables: {
                    "sessionId": null,
                    "title": title,
                    "description": "api test",
                    "presenter": "yml",
                    "presentationStartDate": startDate,
                    "presentationEndDate": endDate,
                    "offlinePresentation": "",
                    "onlinePresentation": "",
                    "teamId": teamId,
                    "orderMealDeadline": orderMealDeadline
                }
            })
            expect(res.data.createPresentation.id).toBeGreaterThanOrEqual(expected)
        }catch(e){
            expect(e.message).toBe(expected)
        }
    })
})
