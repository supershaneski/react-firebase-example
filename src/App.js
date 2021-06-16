import React, { useState } from 'react';

import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";
//import "firebase/messaging";

import {
  FirebaseDatabaseProvider,
  FirebaseDatabaseNode
} from "@react-firebase/database";

import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  //IfFirebaseAuthedAnd
} from "@react-firebase/auth";

import { config } from "./config";
import storage from './storage';

import Login, { LoginModes, LoginTypes  } from './components/Login';
import AddButton from './components/AddButton';
import AddPanel from './components/AddPanel';
import ThumbList from './components/ThumbList';
import classes from './App.module.css';

function getDateFormat() {

    var odate = new Date();

    var year = odate.getFullYear();
    var month = odate.getMonth() + 1;
    var date = odate.getDate();

    var hour = parseInt(odate.getHours());
    var mins = parseInt(odate.getMinutes());
    var sec = parseInt(odate.getSeconds());

    hour = hour < 10 ? "0" + hour : hour;
    mins = mins < 10 ? "0" + mins : mins;
    sec = sec < 10 ? "0" + sec : sec;
    
    var sdate = [year, month, date].join("-");
    var stime = [hour,mins,sec].join(":");

    return [sdate, stime].join(" ");

}

function getSimpleId() {
    return ["abc", Date.now()].join("");
}

export const DIR_DATABASE = "bboard";
export const DIR_CLOUD_STORAGE = "images";

function App() {
    
    const [isAdd, setIsAdd] = useState(false)
    
    const handleLogin = (stype) => {
        
        if(stype === LoginTypes.Anonymous) {

            firebase.auth().signInAnonymously()

        } else if(stype === LoginTypes.Google) {

            const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(googleAuthProvider)

        } else {

            firebase.auth().signOut()

        }

    }

    const handleAdd = () => {
        
        setIsAdd(!isAdd)

    }

    const handleCancel = () => {

        setIsAdd(!isAdd)

    }

    const handleSubmit = (caption, image) => {

        const scaption = caption.length > 0 ? caption.trim() : "";
        
        if(scaption.length === 0) {

            return;

        }

        const sdate = getDateFormat()
        const skey = getSimpleId()
        
        if(image) {

            const sname = [skey, image.name].join("_");
            
            //storage.ref(`/images/${fname}`).put(image)
            //.on("state_changed", console.log("success!"), console.log)
            
            const task = storage.ref(`/${DIR_CLOUD_STORAGE}/${sname}`).put(image);
            
            task.on('state_changed', ts => {

                console.log("success!")

            })

            task.then(() => {

                firebase.database().ref(`${DIR_DATABASE}/${skey}`).set({
                    date: sdate,
                    caption: scaption,
                    image: sname,
                })
                
            })

        } else {

            firebase.database().ref(`${DIR_DATABASE}/${skey}`).set({
                date: sdate,
                caption: scaption,
            })

        }

        setIsAdd(!isAdd)

    }
    
    return (
        <div className={classes.container}>
            <FirebaseAuthProvider firebase={firebase} {...config}>
                <div className={classes.header}>
                    <FirebaseAuthConsumer>
                    {
                        ({ isSignedIn, user, providerId }) => {
                            if(isSignedIn) {
                                return (
                                    <Login mode={LoginModes.LoggedIn} onClick={handleLogin} />
                                )
                            } else {
                                return (
                                    <Login mode={LoginModes.LoggedOut} onClick={handleLogin} />
                                )
                            }
                        }
                    }
                    </FirebaseAuthConsumer>
                </div>
                <div className={classes.main}>
                    <div className={classes.inner}>
                        <IfFirebaseAuthed>
                        {
                            () => {
                                return (
                                    <div className={classes.item}>
                                        <div className={classes.itemInner}>
                                            <AddButton onClick={handleAdd} />
                                        </div>
                                    </div>
                                )
                            }
                        }
                        </IfFirebaseAuthed>
                        <FirebaseDatabaseProvider firebase={firebase} {...config}>
                            <FirebaseDatabaseNode
                            path={`${DIR_DATABASE}/`}
                            >
                            {
                                d => <ThumbList data={d} />
                            }
                            </FirebaseDatabaseNode>
                        </FirebaseDatabaseProvider>
                    </div>
                </div>
                <AddPanel 
                onSubmit={handleSubmit}
                onCancel={handleCancel} 
                show={isAdd}
                />
            </FirebaseAuthProvider>
        </div>
    )
}

export default App;