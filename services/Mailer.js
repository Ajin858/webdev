const sendgrid = require('sendgrid')
const helper = sendgrid.mail
const keys = require('../config/keys')

class Mailer extends helper.Mail{
    constructor({subject , recipient} , content){
        super()

        this.sgApi = sendgrid(keys.sendGridKey)
        this.from_email = new helper.Email('no-reply@email.com')
        this.subject = subject
        this.body = new helper.Content('text/html', content)
        this.recipient = this.formatAddresses(recipient)

        this.addContent(this.body)
        this.addClickTracking()
        this.addRecipients()
    }

    formatAddresses(recipient){
        return recipient.map(({ email })=> {
            return new helper.Email(email)
        })
    }

    addClickTracking(){
        const trackSettings = new helper.trackSettings()
        const clickTracking = new helper.ClickTracking(True,True)

        trackSettings.setClickTracking(clickTracking)
        this.addTrackingSettings(trackSettings)
    }

    addRecipients() {
        const personalize = new helper.Personalization()

        this.recipients.forEach(recipient => {
            personalize.addTo(this.recipient)
        })

        this.addPersonalization(personalize)
    }

    async send() {
        const request = this.sgApi.emptyRequest({
            method : 'POST',
            path : '/v3/mail/send',
            body : this.toJSON() 
        })

        const response = await this.sgApi.API(request)
        return response
    }
}

module.exports = Mailer