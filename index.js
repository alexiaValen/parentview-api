const PORT = process.env.PORT || 3000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()
const cors = require('cors')
app.use(cors())

const autismArticles = []

const mindsetArticles = []

const legalArticles = []

const stylesArticles = []

const prenatalArticles = []


const autismResources = [
    {
        name: 'verywellfamily',
        address: 'https://www.verywellfamily.com/search?q=autism',
        base: 'https://www.verywellfamily.com/search?q=autism'
    }
]

const mindsetResources = [
    {
        name: 'khanacademy',
        address: 'https://www.khanacademy.org/college-careers-more/learnstorm-growth-mindset-activities-us/high-school-activities',
        base: 'https://www.khanacademy.org/college-careers-more/learnstorm-growth-mindset-activities-us/high-school-activities'
    }

]

const legalResources = [
    {
        name: 'findlaw',
        address: 'https://www.findlaw.com/family.html',
        base: ''
    },
 ]

const stylesResources = [
    {
        name: 'verywellmind',
        address: 'https://www.verywellmind.com/parenting-styles-2795072',
        base: ''
    }
]


const prenatalResources = [
    {
        name: 'babylist',
        address: 'https://www.babylist.com/hello-baby/pregnancy',
        base: 'https://www.babylist.com/hello-baby/pregnancy'
    }
]



autismResources.forEach(resource => {
    axios.get(resource.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("autism")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')

                autismArticles.push({
                    title,
                    url: resource.base + url,
                    source: resource.name
                })
            })

        })
})


mindsetResources.forEach(resource => {
    axios.get(resource.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("mind")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')

                mindsetArticles.push({
                    title,
                    url: resource.base + url,
                    source: resource.name
                })
            })
            console.log(mindsetArticles)
        })
})

legalResources.forEach(resource => {
    axios.get(resource.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("family")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')

                legalArticles.push({
                    title,
                    url: resource.base + url,
                    source: resource.name
                })
            })
            console.log(legalArticles)
        })
})


stylesResources.forEach(resource => {
    axios.get(resource.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("parenting")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')

                stylesArticles.push({
                    title,
                    url: resource.base + url,
                    source: resource.name
                })
            })
            console.log(stylesArticles)
        })
})


prenatalResources.forEach(resource => {
    axios.get(resource.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("baby")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')

                prenatalArticles.push({
                    title,
                    url: resource.base + url,
                    source: resource.name
                })
            })
            console.log(prenatalArticles)
        })
})


app.get('/', (req, res) => {
    res.json('Welcome to my Parent Resource API')
})

app.get('/resources/autism', (req, res) => {
    res.json(autismArticles)
})

app.get('/resources/styles', (req, res) => {
    res.json(stylesArticles)
})

app.get('/resources/legal', (req, res) => {
    res.json(legalArticles)
})

app.get('/resources/happymind', (req, res) => {
    res.json(mindsetArticles)
})


app.get('/resources/prenatal', (req, res) => {
    res.json(prenatalArticles)
})



app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))
