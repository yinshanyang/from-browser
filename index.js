const puppeteer = require('puppeteer-extra')
const plugins = {
  stealth: require('puppeteer-extra-plugin-stealth'),
  ua: require('puppeteer-extra-plugin-anonymize-ua')
}
const { from } = require('rxjs')
const { mapTo, concatMap, shareReplay, tap } = require('rxjs/operators')

puppeteer.use(plugins.stealth())
puppeteer.use(plugins.ua())

const fromBrowser = (options) =>
  from(puppeteer.launch({ headless: true, dumpio: true, ...options }))

const action = (f) =>
  concatMap(({ browser, page, ...rest }) =>
    from(f({ browser, page, ...rest })).pipe(
      mapTo({ browser, page, ...rest })
    )
  )

module.exports = { fromBrowser, action }
