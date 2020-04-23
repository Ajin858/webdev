module.exports = survey => {
    return `
        <html>
            <body>
                <div style="text-align:center;">
                    <h3>i'd like your input!</h3>
                    <p>please answer the following question:</p>
                    <p>${survey.body}</p>
                 <div>
                        <a href = "http://localhost:3000">yes</a>
                 </div>
                 <div>
                        <a href = "http://localhost:3000">no</a>
                 </div>
                </div>
            </body>
        </html>
    `
}