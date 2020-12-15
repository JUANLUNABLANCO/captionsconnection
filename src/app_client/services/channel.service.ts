import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChannelModel } from '../models/Channel.model';
import { Observable } from 'rxjs'; 
// import { map } from 'rxjs/operators'; // operators

@Injectable({
  providedIn: 'root'
})
export class ChannelService  {

  newChannel: ChannelModel;
  urlBase = 'http://localhost:3333/api';
  // TODO: el token será leido del localstorage,
  authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiX2lkIjoiNWY2Nzk4NzkwNTZhNWQwZWM0MTI5MTQ4IiwiY3JlYXRlZEF0IjoiMjAyMC0wOS0yMFQxNzo1OToyMS42NDFaIn0sImlhdCI6MTYwMTc1MjQ3OCwiZXhwIjoxNjAxNzUyNjU4fQ.QHpcB2FjLwHLbi1FmRacS4aM3b4SQfR_OifWxycZqCI';


  constructor( private http: HttpClient) { }

  // HASK: MIRA LOS DATOS datosForNewChannel:any intenta que sean de tipo cnannel_form
  // KASK: MIRA LOS OBSERVABLES QUE RECIBAN DATOS CORRECTOS  Observable<datosFromServer>
  addChannelClient(datosForNewChannel: any): Observable<object>{
    // const httpOptions = {
    //   headers: [new HttpHeaders({ 'Content-Type': 'application/json' }), new HttpHeaders( { Authorization: 'Bearer ' + this.token })]
    // };
    // JSON.stringify(datosForNewChannel)
    // const headers = { Authorization: this.authToken }; // no necesitas permisos para que se registre el cliente o el channel

    console.log(datosForNewChannel);
    // console.log('in the ClientChannelService');
    this.newChannel = new ChannelModel(
      // los datos se procesan, se le añade channelType = 'YOUTUBER'
      datosForNewChannel.clientEmail,
      datosForNewChannel.channelName,
      datosForNewChannel.channelLanguage,
      datosForNewChannel.channelCategory,
      datosForNewChannel.clientInterestingNow );
    console.log(this.newChannel);
    // TODO: mandar la peticion post al servidor. http://localhost:3000/api/clients/channel/register post [token][data-channel]
    // return this.http.post( this.urlBase + '/clients/channel/register' , this.newChannel, { headers } );
    return this.http.post( this.urlBase + '/channel/register' , this.newChannel);
  }

  checkChannelNameExists(channelName: string): Observable<object> {
    console.log('servicio: ', channelName);
    // return of({ isChannelNameAvailable: channelName !== 'machupichu' }).pipe(
    // delay(500);
    // );
    return (this.http.post( this.urlBase + '/channel/check-channel-exists', { channelName }));
  }
}
