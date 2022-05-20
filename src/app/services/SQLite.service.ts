import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
providedIn: 'root'
})

export class SQLiteService {
private dbInstance: SQLiteObject;
readonly db_name: string = "remotestack.db";
readonly db_table: string = "favsTable";
FAVS: Array <any>;

constructor(
    private platform: Platform,
    private sqlite: SQLite
    ) {
    this.databaseConn();
    }

    databaseConn() {
        this.platform.ready().then(() => {
          this.sqlite.create({name:this.db_name, location: 'default'})
          .then((sqLite: SQLiteObject) => {
            this.dbInstance = sqLite;
            //sqLite.executeSql(`DROP TABLE IF EXISTS ${this.db_table}`);
            sqLite.executeSql(`
            CREATE TABLE IF NOT EXISTS ${this.db_table} 
              (gig_id INTEGER PRIMARY KEY, 
              name varchar(255), id varchar(255), image varchar(255))`, [])
          })
          .catch((error) => alert(JSON.stringify(error)));
        });
      }

    public addGig(gig_name, gig_id, gig_image) {
        this.dbInstance.executeSql(`
        INSERT INTO ${this.db_table} (name,id,image) VALUES ('${gig_name}', '${gig_id}', '${gig_image}')`, [])
        .then(() => {
        alert("Added to favorites");
        }, (e) => {alert(JSON.stringify(e.err));});
    }

    getAllGigs() {
        return this.dbInstance.executeSql(`
        SELECT * FROM ${this.db_table}`, []).then((res) => {
          this.FAVS = [];
          if(res.rows.length > 0) {
            for(var i = 0;i < res.rows.length;i++) {
              this.FAVS.push(res.rows.item(i));
            }
            return this.FAVS;
          }
        }, (e) => {
          alert(JSON.stringify(e));
        });
      }

    deleteGig(gig_id) {
      this.dbInstance.executeSql(`
      DELETE FROM ${this.db_table} WHERE id = "${gig_id}"`, [])
      .then(() => {
        alert("Deleted from favorites!");
      })
      .catch((e) => {
        alert(JSON.stringify(e));
      });
    }
}