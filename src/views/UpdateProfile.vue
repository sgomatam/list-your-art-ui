<template>
  <div class="ui stackable grid">

    <div class="eight wide column">
      <div class="ui segment">
        <h2 class="ui dividing text-center mt-3">Edit Profile</h2>

        <form class="py-4" @submit.prevent="updateProfile">
            <div class="col-lg-12 text-center">
                <div class="edit-user-details__avatar">

                    <img v-if="currentUser.profilePic" :src="API_HOST+currentUser.profilePic" id="profileImage" alt="Profile Picture"/>
                    <img v-else src="@/assets/home.jpg" id="profileImage" alt="Profile Picture">
                </div>

                <div class="edit-user-details__avatar ">
                    <label class="edit-user mt-2">
                        <i class="material-icons"></i> Upload Image
                        <input type="file" id="userProfilePicture" @change="onImgSelect" ref="file" class="d-none">
                    </label>
                </div>
            </div>

            <div class="form-row mx-4 mt-4">
                <div class="col-lg-12">
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="firstName">First Name</label>
                            <input
                                v-model="currentUser.firstName"
                                v-validate="'required'"
                                type="text"
                                class="form-control"
                                name="firstName"
                            />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="lastName">Last Name</label>
                            <input
                                v-model="currentUser.lastName"
                                v-validate="'required'"
                                type="text"
                                class="form-control"
                                name="lastName"
                            />
                        </div>
                        
                        <div class="form-group col-md-6">
                            <label for="emailAddress">Email</label>
                            <div class="input-group input-group-seamless">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">
                                    <i class="material-icons"></i>
                                    </div>
                                </div>
                                <input
                                    v-model="currentUser.email"
                                    v-validate="'required|email|max:50'"
                                    type="email"
                                    class="form-control"
                                    name="email"
                                    disabled
                                />
                            </div>
                        </div>

                        <div class="form-group col-md-6">
                            <label for="phoneNumber">Phone Number</label>
                            <div class="input-group input-group-seamless">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">
                                    <i class="material-icons"></i>
                                    </div>
                                </div>
                                <input
                                    v-model="currentUser.phone"
                                    v-validate="'required|min:6|max:40'"
                                    type="text"
                                    class="form-control"
                                    name="password"
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-row mx-4">
                <div class="form-group col-md-6">
                    <label for="userBio">Bio</label>
                    <textarea 
                        v-model="currentUser.bio" 
                        style="min-height: 87px;" 
                        id="userBio" name="userBio" 
                        placeholder="A breif bio of you" 
                        class="form-control">
                    </textarea>
                </div>
                <div class="form-group col-md-6">
                    <label for="userTags">Categories</label>
                    <input-tag data-role="tagsinput" v-model="currentUser.tags" :limit="10" placeholder="Tag your skills..."></input-tag>
                </div>
            </div>
            <hr>
            <div class="form-row mx-4">
                <div class="col mb-3">
                    <h6 class="form-text m-0">Social</h6>
                    <p class="form-text text-muted m-0">Setup your social profiles info.</p>
                </div>
            </div>
            <div class="form-row mx-4">
                <div class="form-group col-md-6">
                    <label for="socialFacebook">Facebook</label>
                    <div class="input-group input-group-seamless">
                        <input type="text" v-model="currentUser.facebookHandle" placeholder="www.facebook.com/username" class="form-control" id="socialFacebook">
                    </div>
                </div>
                <div class="form-group col-md-6">
                    <label for="socialTwitter">Twitter</label>
                    <div class="input-group input-group-seamless">
                        <input type="text" v-model="currentUser.twitterHandle" placeholder="www.twitter.com/username" class="form-control" id="socialTwitter">
                    </div>
                </div>
            </div>

            <hr>

            <div class="form-row mx-4" text-center>
                <div class="col mb-3">
                    <h6 class="form-text m-0">Enter Your Password</h6>
                </div>
            </div>
            <div class="form-row mx-4">
                <div class="form-group col-md-4">
                    <input type="password" class="form-control" v-model="currentUser.password" id="oldPassword" placeholder="Password">
                </div>
            </div>

            <div class="text-center">
                <button class="btn btn-primary text-center mr-4">Update profile</button>
                <router-link class="btn btn-primary text-center" to="/profile">Cancel</router-link>
            </div>

            <div class="form-group">
                <div v-if="message" class="alert alert-danger text-center m-3" role="alert">{{message}}</div>
            </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
    import Notification from '@/components/Notification';
    import {authHeader} from '../utils/util';
    import InputTag from 'vue-input-tag'

    export default {
        name: 'UpdateProfile',
        components: {
            Notification,
            InputTag
        },
        data () {
            return {
                API_HOST: process.env.VUE_APP_API_HOST,
                message: ''
            }
        },
        beforeRouteEnter (to, from, next) {
            return next();
        },
        created () {
            document.body.scrollTop = 0; 
            document.documentElement.scrollTop = 0;
            if (!this.currentUser) {
                this.$router.push('/login');
            }
            //this.fetchAuthenticatedUser()
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        methods: {
            // fetchAuthenticatedUser () {
            //     axios
            //         .get('account/me', {
            //             headers: authHeader()
            //         })
            //         .then(response => {
            //             this.name = response.data.data.name
            //             this.username = response.data.data.username
            //             this.email = response.data.data.email
            //             this.location = response.data.data.location
            //             this.bio = response.data.data.bio
            //             this.websiteUrl = response.data.data.website_url
            //         })
            // },

            onImgSelect(e) {
                this.profilePic = e.target.files[0];
                document.getElementById("profileImage")

                if (typeof FileReader === 'function') {
                    const reader = new FileReader();

                    reader.onload = (event) => {
                        // rebuild cropperjs with the updated source
                        document.getElementById("profileImage").src = event.target.result;
                    };

                    reader.readAsDataURL(this.profilePic);
                } else {
                    alert('Sorry, FileReader API not supported');
                }

            },
            updateProfile () {
                this.loading = true;
                let formData = new FormData();
                let that = this;
                let model = {};
                Object.assign(model, this.currentUser);
                this.$validator.validateAll().then(isValid => {
                    if (!isValid) {
                        that.loading = false;
                        return;
                    }
                
                    // pass the image uploaded if exist, if not, read the existing image
                    that.profilePic && formData.append('file', that.profilePic, that.profilePic.name);
              
                    // Append image file
                    delete model["accessToken"];
                    delete model["tokenType"];
                    formData.append('model', JSON.stringify(model));

                    that.$store.dispatch('auth/updateProfile', formData).then(
                        () => {
                            that.$router.push('/profile');
                        },
                        error => {
                            that.loading = false;
                            that.message =
                                (error.response && error.response.data && error.response.data.message) ||
                                error.message ||
                                error.toString();
                        }
                    );

                });

            }
        }
    };
</script>

<style scoped>

.form-control {
    height: auto;
    padding: .4375rem .75rem;
    font-size: .8125rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    border: 1px solid #e1e5eb;
    font-weight: 300;
    will-change: border-color,box-shadow;
    border-radius: .25rem;
    box-shadow: none;
    transition: box-shadow 250ms cubic-bezier(.27,.01,.38,1.06),border 250ms cubic-bezier(.27,.01,.38,1.06);
}

.bootstrap-tagsinput {
    padding: .4375rem .375rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    border: 1px solid #e1e5eb;
    border-radius: .25rem;
    transition: box-shadow 250ms cubic-bezier(.27,.01,.38,1.06),border 250ms cubic-bezier(.27,.01,.38,1.06)
}

.bootstrap-tagsinput.focus {
    color: #495057;
    background-color: #fff;
    border-color: #007bff;
    box-shadow: 0 .313rem .719rem rgba(0,123,255,.1),0 .156rem .125rem rgba(0,0,0,.06)
}

.bootstrap-tagsinput>input {
    border: none;
    padding: 0
}

.bootstrap-tagsinput>input:focus {
    outline: 0
}

.bootstrap-tagsinput .tag {
    display: inline-block;
    background: #fbfbfb;
    padding: .125rem 1.375rem .125rem .625rem;
    margin-bottom: .3125rem;
    border-radius: 1.25rem;
    font-size: .6875rem;
    position: relative;
    text-transform: uppercase;
    border: 1px solid #e1e5eb;
    color: #818ea3
}

.bootstrap-tagsinput .tag>span {
    position: absolute;
    background-image: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTE5IDYuNDFMMTcuNTkgNSAxMiAxMC41OSA2LjQxIDUgNSA2LjQxIDEwLjU5IDEyIDUgMTcuNTkgNi40MSAxOSAxMiAxMy40MSAxNy41OSAxOSAxOSAxNy41OSAxMy40MSAxMnoiLz4gICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==);
    right: .5rem;
    top: 50%;
    width: .625rem;
    height: .625rem;
    background-repeat: no-repeat;
    background-position: center center;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    background-size: 100%;
    opacity: .5
}

.bootstrap-tagsinput .tag>span:hover {
    cursor: pointer
}

.edit-user-details .card-header {
    overflow: hidden
}

.edit-user-details .card-body {
    z-index: 1
}

.edit-user-details__bg {
    width: 100%;
    position: relative;
    max-height: 7.1875rem
}

.edit-user-details__bg img {
    width: 100%
}

.edit-user-details__bg:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
        right: 0;
    bottom: 0;
    background-color: rgba(90,97,105,.5);
    will-change: background-color;
    transition: background-color 250ms ease-in-out
}

.edit-user-details__bg .edit-user-details__change-background {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    opacity: 1;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    background-color: rgba(255,255,255,.06);
    border: 1px dashed rgba(233,236,239,.3);
    padding: .4375rem .9375rem;
    color: #fff;
    border-radius: .375rem;
    box-shadow: .375rem;
    font-size: .75rem;
    will-change: opacity;
    transition: opacity 250ms ease-in-out,-webkit-transform 250ms ease-in-out;
    transition: opacity 250ms ease-in-out,transform 250ms ease-in-out;
    transition: opacity 250ms ease-in-out,transform 250ms ease-in-out,-webkit-transform 250ms ease-in-out
}

.edit-user-details__bg .edit-user-details__change-background:hover {
    cursor: pointer;
    -webkit-transform: translate(-50%,-50%) scale(1.05);
    transform: translate(-50%,-50%) scale(1.05)
}

.edit-user-details__bg .edit-user-details__change-background i {
    font-size: .9375rem;
    top: .125rem
}

.edit-user-details__avatar {
    overflow: hidden;
    position: relative;
}

.edit-user-details__avatar img {
    width: 300px;
}

i.material-icons {
    font-size: inherit;
    position: relative;
    top: 2px;
}

.vue-input-tag-wrapper span.input-tag {
    background-color: #ddd;
    border-radius: 15px;
    border: 1px solid #ddd;
    color: #000000;
    display: inline-block;
    font-size: 13px;
    font-weight: 400;
    margin-bottom: 4px;
    margin-right: 4px;
    padding: 5px;
}

.vue-input-tag-wrapper .input-tag .remove {
    cursor: pointer;
    font-weight: 700;
    color: #000;
    margin: 4px;
}

</style>