var app = new Vue ({
    el: '#app',
    data: {
        apartados: [true,false,false,false,false,false,false],
        maping: true,
        retroceso: [0],
        clicked: 0,
        title: [],
        places: [],
        games: [],
        select: "",
        filtred: [],
    },
    methods: {
        seleccionarMapa(){
            this.maping = false;
            this.select = document.getElementById('slctMap').value;
            let locationFilter = [];
            for(i = 0; i < this.places.length; i++){
                if(this.places[i].value === this.select){
                    locationFilter.push(this.places[i]);
                }
            }
            this.filtred = locationFilter;
        },
        cambiarApartado(val){
            this.clicked = val;
            traer(url);
            for(i in this.apartados){
                this.apartados[i] = false;
            }
            this.apartados[val] = true;
            if(this.retroceso[this.retroceso.length - 1] !== val){
                this.retroceso.push(val);
            }
            if(this.retroceso[this.retroceso.length - 1] == 0){
                this.retroceso = [0]
            }
        },
        clickRetroceso(val){
            if(this.retroceso.length !== 1){
                this.retroceso.pop();
                this.cambiarApartado(val);
            }
            if(this.retroceso[this.retroceso.length - 1] == 0){
                this.retroceso = [0]
            }
        },
        filter(){
            let vl_flt = document.getElementById('tabInfo').value;
            let v_slct = document.getElementById('slct').value;
            console.log(vl_flt);
            if((v_slct === 'id' || v_slct === 'date' || v_slct === 'place') && (vl_flt === this.games.calendar_sept[0].date)){
                console.log(vl_flt);
            }
        }
    }
})



var url = '../main.json';

function traer(url){
    fetch(url)
    .then(function(response) {
    return response.json();
    })
    .then(function(data) {
    app.title = data.titles[app.clicked];
    app.places = data.locations;
    app.games = data.games;
  });
}
traer(url);