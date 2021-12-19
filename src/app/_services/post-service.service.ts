import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { Post } from '../_models/post.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from '../_models/registerUser.model';

@Injectable({
  providedIn: 'root'
})

export class PostServiceService {

  postRef: AngularFirestoreCollection<Post> | undefined;
  posts?: Post[];

  constructor(public db: AngularFirestore) {

  }

  createPost(post: any) {
    return this.db.collection('Posts').add(post);
  }

  getAllPosts() {
    return this.db.collection('Posts').snapshotChanges();
  }

  getFriendList(){
    return this.db.collection('FriendList').snapshotChanges();
  }

  updatePost(postID: string, postBody: string) {
    this.db.collection('Posts' ).doc(postID).update({
      body: postBody
    });
  }

  deletePost(postID: string ) {
    this.db.collection('Posts' ).doc(postID).delete();
  }

}
