const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// Listens to incoming messages that contain "hello"
app.command("/salesforcedemo", async ({ respond, command, ack, say }) => {
  // コマンドリクエストを確認

  ack();
  respond({
    response_type: "ephemeral",
    blocks: [
      {
        type: "section",
        text: {
          type: "plain_text",
          text: "There are 2 results for '" + command.text + "'.",
          emoji: true
        }
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: "Use the buttons to filter results by record type"
          }
        ]
      },

      {
        type: "actions",
        block_id: "actionblock789",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "取引先 (1)"
            },
            action_id: "account",
            value: command.text
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "ケース (1)"
            },
            action_id: "case",
            value: command.text
          }
        ]
      }
    ]
  });
  //  say(`${command.text}`)
});

app.action("account", async ({ action, ack, say, respond }) => {
  ack();
  // アクションを反映してメッセージをアップデート
  respond({
    replace_original: false,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*Accounts*"
        }
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: "<https://slack.com|*" + action.value + "*>"
          }
        ]
      },
      {
        type: "context",
        elements: [
          {
            type: "image",
            image_url:
              "https://slack.com/interop-apps/salesforce/images/account_icon.png",
            alt_text: "plants"
          },
          {
            type: "mrkdwn",
            text: "*Account*"
          }
        ]
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "View Record",
              emoji: true
            },
            action_id: "ViewAccountRecord",
            value: action.value
          }
        ]
      }
    ]
  });
});

app.action("ViewAccountRecord", async ({ action, ack, say, respond }) => {
  ack();
  respond({
    replace_original: false,
    blocks: [
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: "<https://slack.com|*" + action.value + "*>"
          }
        ]
      },
      {
        type: "context",
        elements: [
          {
            type: "image",
            image_url:
              "https://slack.com/interop-apps/salesforce/images/account_icon.png",
            alt_text: "plants"
          },
          {
            type: "mrkdwn",
            text: "*Account*"
          },
          {
            type: "mrkdwn",
            text: "*Owner:* 小川 智久"
          }
        ]
      },
      {
        type: "section",
        block_id: "z9JfH",
        fields: [
          {
            type: "mrkdwn",
            text: "*Account Type:*",
            verbatim: false
          },
          {
            type: "mrkdwn",
            text: "顧客（直販）",
            verbatim: false
          },
          {
            type: "mrkdwn",
            text: "*Website:*",
            verbatim: false
          },
          {
            type: "mrkdwn",
            text: "www.tanaka.com",
            verbatim: false
          },
          {
            type: "mrkdwn",
            text: "*Industry:*",
            verbatim: false
          },
          {
            type: "mrkdwn",
            text: "Shipping",
            verbatim: false
          }
        ]
      },
      {
        type: "section",
        block_id: "vU8z",
        fields: [
          {
            type: "mrkdwn",
            text: "*Annual Revenue:*",
            verbatim: false
          },
          {
            type: "mrkdwn",
            text: "120,000,000",
            verbatim: false
          }
        ]
      }
    ]
  });
});

app.action("case", async ({ ack, say, respond }) => {
  ack();
  // アクションを反映してメッセージをアップデート
  respond({
    replace_original: false,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*Cases*"
        }
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: "<https://slack.com|*荷物が届かない*>"
          }
        ]
      },
      {
        type: "context",
        elements: [
          {
            type: "image",
            image_url:
              "https://slack.com/interop-apps/salesforce/images/case_icon.png",
            alt_text: "plants"
          },
          {
            type: "mrkdwn",
            text: "*Case*"
          }
        ]
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "View Record",
              emoji: true
            },
            action_id: "ViewCaseRecord"
          }
        ]
      }
    ]
  });
});

app.action("ViewCaseRecord", async ({ ack, say, respond }) => {
  ack();
  respond({
    replace_original: false,
    blocks: [
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: "<https://slack.com|*荷物が届かない*>"
          }
        ]
      },
      {
        type: "context",
        elements: [
          {
            type: "image",
            image_url:
              "https://slack.com/interop-apps/salesforce/images/case_icon.png",
            alt_text: "plants"
          },
          {
            type: "mrkdwn",
            text: "*Case*"
          },
          {
            type: "mrkdwn",
            text: "*Owner:* 小川 智久"
          }
        ]
      },
      {
        type: "section",
        block_id: "4Dq",
        fields: [
          {
            type: "mrkdwn",
            text: "*Case Number:*",
            verbatim: false
          },
          {
            type: "mrkdwn",
            text: "00001026",
            verbatim: false
          },
          {
            type: "mrkdwn",
            text: "*Case Status:*",
            verbatim: false
          },
          {
            type: "mrkdwn",
            text: "New",
            verbatim: false
          },
          {
            type: "mrkdwn",
            text: "*Case Priority:*",
            verbatim: false
          },
          {
            type: "mrkdwn",
            text: "Medium",
            verbatim: false
          },
          {
            type: "mrkdwn",
            text: "*Case Subject:*",
            verbatim: false
          },
          {
            type: "mrkdwn",
            text: "荷物が届かない",
            verbatim: false
          }
        ]
      }
    ]
  });
});

app.message('hello', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say({
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `Hey there <@${message.user}>!`
        },
        "accessory": {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Click Me"
          },
          "action_id": "button_click"
        }
      }
    ],
    text: `Hey there <@${message.user}>!`
  });
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
