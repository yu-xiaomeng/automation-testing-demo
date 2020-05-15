# cucumber 

https://cucumber.io/docs/guides/overview/



## 1. [Behaviour-Driven Development(BDD)](https://cucumber.io/docs/bdd/) 行为驱动开发

- Given/When/Then
- 读起来就像是一份文档
- 鼓励跨角色协作建立对要解决问题的共识
  - 领域知识不同、语言不通导致沟通障碍

## 2. 认识Cucumber

Cucumber读取以纯文本形式编写的可执行规范，并验证该软件是否满足那些规范所说的内容

![cucumber-intro](https://xmzines.oss-cn-shenzhen.aliyuncs.com/img/image-20200425215346065.png)


### 2.1 Gherkin语法

#### Keywords

- `Feature`/功能
- `Scenario`/场景
- `Given`, `When`, `Then`, `And`, `But`/假如，当，那么，而且，但是
- `Scenario Outline`/场景大纲
- `Examples`/例子

#### a few secondary keywords as well

- `"""` (Doc Strings)
- `|` (Data Tables)
- `@` (Tags)
- `#` (Comments)

可以使用 `# language: zh-CN` 切换为中文

### 2.2 Step-definitions 步骤定义

用代码实现Gherkin中定义的步骤的实际操作

- Gherkin：Given today is sunday

- step-def：

  ```js
  Given('today is Sunday', function (){ 
  	this.today = 'Sunday'; 
  });
  ```



1. 写feature文件（Scenario、steps）

2. 定义step-def，让测试失败

3. 实现step-def，让测试通过

4. 重构

    

### 2.3 示例

```
# project structure
   + features
      + step_definitions
         stepdefs.js
      is_it_friday_yet.feature
```

stepdefs.js

```js
const assert = require('assert');
const { Given, When, Then } = require('cucumber');

function isItFriday(today) {
  if (today === "Friday") {
    return "TGIF";
  } else {
    return "Nope";
  }
}
    
Given('today is {string}', function (givenDay) {
  this.today = givenDay;
});

When('I ask whether it\'s Friday yet', function () {
  this.actualAnswer = isItFriday(this.today);
});

Then('I should be told {string}', function (expectedAnswer) {
  assert.equal(this.actualAnswer, expectedAnswer);
});
```

is_it_friday_yet.feature

```gherkin
Feature: Is it Friday yet?
  Everybody wants to know when it's Friday
  
  Scenario: Sunday isn't Friday
    Given today is Sunday
    When I ask whether it's Friday yet
    Then I should be told "Nope"

  Scenario: Friday is Friday
    Given today is Friday
    When I ask whether it's Friday yet
    Then I should be told "TGIF"


  Scenario Outline: Today is or is not Friday
    Given today is "<day>"
    When I ask whether it's Friday yet
    Then I should be told "<answer>"

  Examples:
    | day            | answer |
    | Friday         | TGIF   |
    | Sunday         | Nope   |
    | anything else! | Nope   |
```



## 3. 实际上手—with selenium

- 主要是在step-definitions实现时，使用selenium
  - example with google search
  - freewheelers

可以用于UI自动化、API自动化等



## 4. 问题和思考

- Cucumber其实不是一个自动化测试工具，而是一个促进团队沟通合作的工具。其实Cucumber只是一个沟通工具，它只是刚巧可以运行测试而已。

- **如何设计好的测试用例，即如何写出好的Gherkin**（@TODO）

  - 需要各角色共同协作，特别是业务人员
  - 关注业务逻辑，不要陷到实现细节里

  例1: 

  ```gherkin
  # For example, for an authentication Scenario, you should write:
  When "Bob" logs in
  
  # instead of:
    Given I visit "/login"
    When I enter "Bob" in the "user name" field
      And I enter "tester" in the "password" field
      And I press the "login" button
    Then I should see the "welcome" page
  ```

   例2: 检查收件箱，可以看出第三个清晰明了且能体现业务价值，比较符合上面的要求。

  ```Gherkin
  # --------------------------------------------------------
  Scenario: Check Inbox
   Given a user "Tom" with password "123"
     And a user "Jerry" with password "abc"
     And an email to "Tom" from "Jerry"
   When I sign in as "Tom" with password "123"
   Then I should see one email from "Jerry" in my inbox
  # --------------------------------------------------------
  Scenario: Check Inbox
   Given a user "Tom"
     And a user "Jerry"
     And an email to "Tom" from "Jerry"
   When I sign in as "Tom"
   Then I should see one email from "Jerry" in my inbox
  
  # --------------------------------------------------------
  Scenario:Check Inbox
   Given I have received an email from "Jerry"
   When I sign in
   Then I should see one email from "Jerry" in my inbox
  ```

  - 使用数据驱动的方式(Data Tables)

- 扩展Cucumber生成高质量的文档——可添加每一步的截图（@TODO）

  


## 其他支持BDD工具

- Gauge
- python - lettuce 
  - 教程https://blog.csdn.net/baidu_36943075/article/details/103851458
    UI自动化Demo  https://github.com/fengyibo963/DemoUITestLettuce

