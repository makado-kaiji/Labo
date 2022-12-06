const common = {}
const url = new URL(location.href)
common.URL = {
	href: location.href,
	query: Object.fromEntries(url.searchParams),
}

common.URL.BASE = url.origin + '/'
common.URL.TWDATA = common.URL.BASE + 'tw/'

if (common.URL.href.includes('github.io')) {
	common.URL.BASE += common.URL.href.includes('-test') ? 'twlog/' : 'dt/'
	common.URL.TWDATA = common.URL.href.includes('-test') ? 'https://deductive-test.github.io/twdata/' : common.URL.BASE + 'tw/'
}

const myMixins = {
	data() {
		return {
			common:{
				URL: common.URL,
				isDebug:false,
				debugCount: 0,
				lastModified:'',

				day: ["日", "月", "火", "水", "木", "金", "土"],
			}, // common
			selectDate:[
				{
					text:'2022-04-12 ~ 2022-11-20',
					value:'2022-11-20',
					data:{
						isTweet:false,
						isChildTweet: true,
					},
				},
				{
					text:'2022-04-12 ~ 2022-08-07',
					value:'2022-08-07',
					data:{
						isTweet:true,
						isChildTweet: true,
					},
				},
				{
					text: '2022-04-12 ~ 2022-05-08',
					value: '2022-05-08',
					data: {
						isTweet: true,
						isChildTweet: true,
					},
				},
				{
					text: '2022-02-10 ~ 2022-04-12',
					value: '2022-04-12',
					data: {
						isTweet: true,
						isChildTweet: true,
					},
				},
				{
					text: '2022-01-07 ~ 2022-02-09',
					value: '2022-02-09',
					data: {
						isTweet: true,
						isChildTweet: true,
					},
				},
				{
					text: '2021-10-03 ~ 2022-01-02',
					value: '2022-01-02',
					data: {
						isTweet: true,
						isChildTweet: true,
					},
				},
				{
					text: '2021-02-04 ~ 2021-05-06',
					value: '2021-05-06',
					data: {
						isTweet: true,
						isChildTweet: true,
					},
				},
				{
					text: '2020-11-19 ~ 2021-01-27',
					value: '2021-01-27',
					data: {
						isTweet: true,
						isChildTweet: true,
					},
				},
				{
					text: '2020-08-30 ~ 2020-11-15',
					value: '2020-11-15',
					data: {
						isTweet: true,
						isChildTweet: true,
					},
				},
				{
					text: '2020-08-30 ~ 2020-10-13',
					value: '2020-10-13',
					data: {
						isTweet: true,
					},
				},
				{
					text: '2020-02-09 ~ 2020-05-31',
					value: '2020-05-31',
					data: {
						isTweet: true,
						isChildTweet: true,
					},
				},
				{
					text: '2019-07-21 ~ 2020-02-07',
					value: '2020-02-07',
					data: {
						isTweet: true,
						isChildTweet: true,
					},
				},
				{
					text: '2019-07-21 ~ 2019-08-29',
					value: '2019-08-29',
					data: {
						isTweet: true,
						isChildTweet:false,
					},
				},
				/*
				{
					text: ' ~ ',
					value: '',
					data: {
						isTweet: true,
					},
				},
				*/
			], // selectDate 
		}
	}, // data
	computed: {
	},
	mounted() {
		console.log(`${(new Date()).toLocaleString()} ${(new Date()).getTime()} [myMixins] mounted`)

		this.common.lastModified = this.FormatDate(new Date(document.lastModified),'/',true,true)
	}, // mounted
	methods: {
		changeDebugMode(){
			this.common.debugCount++
			console.log(`this.debugCount = ${this.common.debugCount}`)
			if (this.common.debugCount % 10 === 0) {
				this.common.isDebug = !this.common.isDebug
			}
		},

		VuetifyGoTo(selector){
			if ($(selector)){
				this.$vuetify.goTo($(selector)[0])
			}
		},

		// URL --------------------------------------------------
		hasQuery (key) {
			return typeof this.common.URL.query[key] != 'undefined' && 0 < this.common.URL.query[key].length
		},
		
		getQuery (key) {
			return this.hasQuery(key) ? this.common.URL.query[key] : ''
		},

		createCacheClearURL (urlString = location.href) {
			const url = new URL(urlString)
			url.searchParams.delete('_')
			url.searchParams.append('_', (new Date()).getTime())
			return url.href
		},

		// localstrage --------------------------------------------------
		getLocalStorage (objectName, propertyName) {
			try {
				if (this.NullOrWhiteSpace(objectName)) {
					return null
				}

				if (!localStorage.hasOwnProperty(objectName)) {
					localStorage[objectName] = '{}'
					return null
				}

				let ls = JSON.parse(localStorage[objectName])
				if (!this.NullOrWhiteSpace(propertyName)){
					return ls.hasOwnProperty(propertyName) ? ls[propertyName] : null
				} else {
					return ls
				}

			} catch (e) {
				console.error(e)
			}
			return null
		},

		setLocalStorage (objectName, name, value) {
			try {
				if (this.NullOrWhiteSpace(objectName)) {
					return null
				}

				if (!localStorage.hasOwnProperty(objectName)) {
					localStorage[objectName] = '{}'
				}

				let ls = JSON.parse(localStorage[objectName])
				ls[name] = value
				localStorage[objectName] = JSON.stringify(ls)
				return true

			} catch (e) {
				console.error(e)
			}
			return false
		},

		// cookie --------------------------------------------------
		cookieValue (key){
			let res = ''
			try {
				res = document.cookie
				.split('; ')
				.find(row => row.startsWith(key))
				.split('=')[1]

			} catch (e) {
				console.error(e)

			}
			return res
		},

		// date --------------------------------------------------
		FormatDate (d = new Date(), f = '/', time = false, day = false) {
			return `${d.getFullYear()}${f}${(d.getMonth() + 1).toString().padStart(2, '0')}${f}${d.getDate().toString().padStart(2, '0')}${day ? `(${this.common.day[d.getDay()]})` : ''}${time ? ` ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}` : ''}`
		},

		isDate (v) {
			let res = false
			try {
				res = !isNaN(new Date(v).getTime())
			} catch (e) {console.error(e)}
			return res
		},

		// string --------------------------------------------------
		NullOrWhiteSpace (str) {
			if (str == "" || str == null)
					return true
			return false
		},

		EscapeHTML (html) {
			return $('<div>').text(html).html()
		},

		UnescapeHTML (escapedHtml) {
			const doc = new DOMParser().parseFromString(escapedHtml, 'text/html')
			let ret = doc.documentElement.textContent
			return ret == 'null' ? '' : ret
		},

		createRandomString (length) {
			const str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('')
			let s = ''
			for (let i = 0; i < length; i++) {
				s += str[Math.floor(Math.random() * str.length)]
			}
			return s
		},

		sleep (msec) {
			return new Promise(function (resolve) {
				setTimeout(function () { resolve() }, msec)
			})
		},

		isFunction (f) {
			return (typeof f).toLowerCase() == 'function'
		},

		zjax (option, doneFunc, failFunc, alwaysFunc) {
			var base = {
				type: 'get',
				async: true,
				contentType: 'application/json',
				cache: false,
			}
			var param = $.extend(base, option)

			if (param.data && (typeof param.data).toLowerCase() != 'string' && param.type.toLowerCase() !== 'get') {
				param.data = JSON.stringify(param.data)
			}

			console.log(`${(new Date()).toLocaleString()} ${(new Date()).getTime()} [zjax] start\n${param.url}`)
			let sec = (new Date()).getTime()
			$.ajax(param)
				.done(d => {
					console.log(`${(new Date()).toLocaleString()} ${(new Date()).getTime()} [zjax] done\n${param.url}\nsec = ${(new Date().getTime()) - sec}`)
					// console.log(d)
					if (this.isFunction(doneFunc)) doneFunc(d)
				}).fail(d => {
					console.error(`${(new Date()).toLocaleString()} ${(new Date()).getTime()} [zjax] fail\n${param.url}\nsec = ${(new Date().getTime()) - sec}`)
					console.error(d)
					if (this.isFunction(failFunc)) failFunc(d)
				}).always(d => {
					if (this.isFunction(alwaysFunc)) alwaysFunc(d)
				})
		},
			
	}, // methods
}