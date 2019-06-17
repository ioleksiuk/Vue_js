Vue.component('crypto', {
  template: '<p>Enter cryptocurrency ticker to get the price:<select v-model="question "><option v-for="ticker in tickers"> {{ ticker.currency }} </option></select></p><p>{{ answer }}</p></div><script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script><script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>',
  data: {
    question: '',
    answer: '',
    tickers: [
      { currency: 'btc' },
      { currency: 'bch' },
      { currency: 'bcn' },
      { currency: 'dash' },
      { currency: 'doge' },
      { currency: 'eth' },
      { currency: 'etc' },
      { currency: 'ltc' },
      { currency: 'xmr' },
      { currency: 'ppc' },
      { currency: 'xrp' },
      { currency: 'zec' }
    ],
    currency: 'btc'
  },
  watch: {
    question: function (newQuestion, oldQuestion) {
      // this.answer = '...'
      this.debouncedGetAnswer()
    }
  },
  created: function () {
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
  },
  methods: {
    getAnswer: function () {
      this.currency = this.question
      var vm = this
      axios.get('https://api.cryptonator.com/api/ticker/' + this.currency + '-usd')
        .then(function (response) {
          vm.answer = _.capitalize(response.data.ticker.price + ' ' + 'USD')
        })
        .catch(function (error) {
          vm.answer = 'Error! Cant connect to the API. ' +  error
        })
    }
}})