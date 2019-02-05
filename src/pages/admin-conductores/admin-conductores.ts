import { Component, Query, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading,  MenuController } from 'ionic-angular';
import { AngularFireDatabase, snapshotChanges } from 'angularfire2/database';
import { DetalleConductorPage } from '../detalle-conductor/detalle-conductor';
import firebase from 'firebase';
import { UsuarioServicioProvider } from '../../providers/usuario-servicio/usuario-servicio';
import { AdministradorPage } from '../administrador/administrador';
import { EstadoUsuarioServiceProvider } from '../../providers/estado-usuario-service/estado-usuario-service';


/**
 * Generated class for the AdminConductoresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
//
@IonicPage()
@Component({
  selector: 'page-admin-conductores',
  templateUrl: 'admin-conductores.html',
})
export class AdminConductoresPage implements OnInit {

  cols = [{name:'First Name'},{name:'Last Name'},{name:'Address'}];
data = [];
filteredData = [];
table: any;
// dummy data for datatable rows
dummyData = [
  {firstName:'Daenarys',lastName:'Targaryen',address:'Dragonstone'},
  {firstName:'Sansa',lastName:'Stark',address:'Winterfell'},
  {firstName:'Cersei',lastName:'Lannister',address:'Kings Landing'},
  {firstName:'Brienne',lastName:'Tarth',address:'Sapphire Island'},
  {firstName:'Lyanna',lastName:'Mormont',address:'Bear Island'},
  {firstName:'Margaery',lastName:'Tyrell',address:'Highgarden'}
]








selected = [];

rows = [];

  columns: any[] = [
    { prop: 'name'} , 
    { name: 'Company' }, 
    { name: 'Gender' }
  ];




  tablestyle = 'bootstrap';
 
  usuarios:any  = [];
  conductores: any = [];
  estados = [];
  conductoresOrdenados:any = [];
  flag;
  cantUsuarios;

  constructor(
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public usuarioServicio: UsuarioServicioProvider,
    public estadoUsuarioServicio: EstadoUsuarioServiceProvider,
    public afDB: AngularFireDatabase) {
      this.menuCtrl.enable(false, 'myMenu');//para desactivar el menu desplegable en esta pagina


      this.usuarios = this.navParams.get('usuarios');
      this.cantUsuarios = this.navParams.get('cantUsuarios');

      
//    this.getConductoresOrdenados();

    /*usuarioServicio.changeMessage('asda');

    usuarioServicio.currentMesagge.subscribe(message => {
    });
    
    usuarioServicio.changeMessage('asda');
     
    this.buscarEstadoConductores().then( res => {
      this.usuarios = res['usuarios'];
      this.cantUsuarios = res['cant'];
      usuarioServicio.changeMessage('asda');
    });
  
    console.log(this.estados);
    console.log(this.usuarios);

    usuarioServicio.changeMessage('asda');

    usuarioServicio.currentMesagge.subscribe(message => {
    });

    usuarioServicio.changeMessage('asda');

    usuarioServicio.changeMessage('asda');

    usuarioServicio.currentMesagge.subscribe(message => {
    });

    usuarioServicio.changeMessage('asda');
    */

  }


  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
    //this.irADetalleConductor(this.selected[0].id);
    console.log(selected["0"].id);
    this.irADetalleConductor(selected["0"].id);

  }

  ngOnInit() {
    this.data = this.dummyData;
    // copy over dataset to empty object
    this.filteredData = this.dummyData;
  }

  filterDatatable(event){
    // get the value of the key pressed and make it lowercase
    let val = event.target.value.toLowerCase();
    // get the amount of columns in the table
    let colsAmt = this.cols.length;
    // get the key names of each column in the dataset
    let keys = Object.keys(this.dummyData[0]);
    // assign filtered matches to the active datatable
    this.data = this.filteredData.filter(function(item){
      // iterate through each row's column data
      for (let i=0; i<colsAmt; i++){
        // check for a match
        if (item[keys[i]].toString().toLowerCase().indexOf(val) !== -1 || !val){
          // found match, return true to add to result set
          return true;
        }
      }
    });
    // whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  iraMenuAdmin(){
    this.navCtrl.setRoot(AdministradorPage);
  }

  detalleConductor({ selected }){
    console.log(selected);

  }

  buscarEstadoConductores() {

    return new Promise((resolve, reject) => {

      var usuarios:any = [];
    
    firebase.database().ref('conductor/').orderByChild('estado').on('child_added', (snapshot) => {

      let userRef = firebase.database().ref('usuarios/' + snapshot.key);
        var evaluarEstado = snapshot.val();
        if (evaluarEstado.estado != "-" && evaluarEstado.estado) {
        //this.estados.push(snapshot.val());
        userRef.on('value', userSnap => {
          var value = userSnap.val();
          var val  = snapshot.val();
          value.estado = val.estado;
          if (value.estado == 'PendienteAprobacion'){ value.color = '#E88E0C' };
          if (value.estado == 'Aprobado'){ value.color = '#32db64' };
          if (value.estado == 'DadoDeBaja'){ value.color = '#f53d3d' };
          if (value.estado == 'EnLinea'){ value.color = '#488aff' };
          if (value.estado == 'FueraDeLinea'){ value.color = '#0F0CD1' };
          if (value.estado == 'NoAprobado'){ value.color = '#E80028' };
          if (value.estado == 'Ocupado'){ value.color = '#D1970A' };
          //console.log(userSnap.val()); // trae bien los datos del usuari
          usuarios.push(value);
        });
      } 
    });

    console.log(this.estados);
    console.log(usuarios);
    resolve({'usuarios': usuarios, 'cant': usuarios.length});
  });

  }

  getConductoresOrdenados() {

    firebase.database().ref('conductor/').orderByChild('estado').on('child_added', (snapshot) => {
        var evaluarEstado = snapshot.val();
        if (evaluarEstado.estado != "-" && evaluarEstado.estado) {
          this.conductoresOrdenados.push(evaluarEstado);
      } 
    });

  }

  /*public ionViewWillEnter() {
    this.flag = this.navParams.get('value')|| null;
    if (this.flag == 'actualizar'){
      this.conductores = [];
      this.conductoresOrdenados = [];
      this.buscarEstadoConductores();
      console.log(this.estados);
      console.log(this.usuarios);
  
      
      this.usuarioServicio.changeMessage('asda');
  
      this.usuarioServicio.currentMesagge.subscribe(message => {
      });
  
      this.usuarioServicio.changeMessage('asda');
  

    }
} */

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminConductoresPage');
    console.log(this.navParams.get('usuar'));
    this.usuarios = this.navParams.get('usuarios');
    this.cantUsuarios = this.navParams.get('cantUsuarios');
    this.estadoUsuarioServicio.buscarEstadoConductores().then(res => {
        this.usuarios = res['usuarios'];
        this.cantUsuarios = res['cant'];  
    });
/*    this.buscarEstadoConductores().then( res => {
      this.usuarios = res['usuarios'];
      this.cantUsuarios = res['cant'];
      //usuarioServicio.changeMessage('asda');
    });
*/
  }

  irADetalleConductor(id) {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Cargando..',
      duration: 3000
    });

    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });

    loading.present();

    this.navCtrl.push(DetalleConductorPage, { id: id });
  }
}