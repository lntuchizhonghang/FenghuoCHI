/*
 *
 *this is a muldule
 *
 */
 var net=require('net');
 var count=0;
 var char=null;
 var users={};
 var nickname=null;
 var server=net.createServer(function(conn){
   conn.write('\n> welcome the connective world');
   conn.write('\n>'+count+'other people are connecting');
   conn.write('\n> enter your name and press enter:');
   count++;
   conn.setEncoding('utf8');
   conn.on('close',function (){
     for(var i in users){
       if(i!=nickname){
         users[i].write('The'+nickname+'has left!');
         console.log('');
       }
     }
     delete users[nickname];
     count--;
   });
   conn.on('data',function (data){
   if(data=='\r\n'&&char){
     char=char.replace('null','');
     if(!nickname){
       nickname=char;
       if(users[char]){
         conn.write('The name is already regiest,please try again:');
         return;
       }else{
         users[char]=conn;
         for(var i in users){
           users[i].write('\n> The'+char+'join the romm!\n');
           console.log('');
         }
       }
     }else{
       for(var i in users){
        if(i!=nickname){
            users[i].write('\n > '+nickname+' say:'+char);
            console.log('');
          }

       }
     }

     char=null;
   }else{
     char+=data;
   }
   });
 });
 server.listen(3000,function (){
   console.log('server is listening the 3000 port');
 });
