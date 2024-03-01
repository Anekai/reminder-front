const utilsMixin = {
  methods: {
    cloneArray(array) {
        return JSON.parse(JSON.stringify(array))
    },
    goTo(path){
      this.$router.push(path)        
    },
    formatIsoDate(isoDate) {
      const date = new Date(isoDate);

      return this.dateToString(date)
    },
    formatDate(date) {
      if (date) {
        var dateParts = date.split("-")
        
        var year = parseInt(dateParts[0]);
        var month = parseInt(dateParts[1]) - 1;
        var day = parseInt(dateParts[2]);

        var data = new Date(year, month, day)
        
        return data.toLocaleDateString("pt-BR")
      } else {
        return null
      }
    },
    stringToDate(stringDate) {
      if (stringDate) {
        var dateParts = stringDate.split("-")
        
        var year = parseInt(dateParts[0]);
        var month = parseInt(dateParts[1]) - 1;
        var day = parseInt(dateParts[2]);

        return new Date(year, month, day)
      } else {
        return null
      }
    },
    dateToString(date) {
      if (date) {
        let year = date.getFullYear()
        let month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1)
        let day = (date.getDate() < 9 ? '0' : '') + date.getDate()

        return year + '-' + month + '-' + day
      } else {
        return null
      }
    },
    dateFormat(date) {
      if (date) {
        let year = date.getFullYear()
        let month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1)
        let day = (date.getDate() < 9 ? '0' : '') + date.getDate()

        return day + '/' + month + '/' + year
      } else {
        return null
      }
    },
    dateFormatShort(date) {
      if (date) {
        let month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1)
        let day = (date.getDate() < 9 ? '0' : '') + date.getDate()
        
        return day + '/' + month
      } else {
        return null
      }
    }
  }
}
export default utilsMixin;