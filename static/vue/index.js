let vue = new Vue({
    el: "#app",
    delimiters: ['[[', ']]'],
    data: {
        posts: [],
        error: {
            title: "*",
            content: "*",
            author: "*",
        },
        formClass: {
            errorTitleClass: "",
            errorContentClass: ""
        },
        form: {
            title: "",
            content: "",
            author: "",
        },
        urlPost: '/api/posts/create/',
        disabled: false,
        statusText: '',
    },
    methods: {
        Send: async function () {
            if (this.ValidateForm()) {
                this.disabled = true;
                this.statusText = "Sending post to server... Please await...";
                let data = {
                    "title": this.form.title,
                    "content": this.form.content,
                    "author": this.form.author
                };

                let res = await axios.post(this.urlPost, data);
                if (res.status === 201) {
                    this.statusText = "Post created sucessfully!";
                    await this.RetrivePosts();
                    this.Clear();
                }
                this.disabled = false;
            }
        },
        Clear: function () {
            this.form.title = "";
            this.form.content = "";
            this.form.author = "";
            this.ClearErrors();
        },
        ClearErrors: function () {
            this.error.title = "";
            this.error.content = "";
            this.formClass.errorTitleClass = "";
            this.formClass.errorContentClass = "";
        },
        ValidateForm: function () {
            var error = 0;
            this.ClearErrors();
            if (this.form.title.length < 4) {
                this.error.title = "*Please, insert a valid name (>4 characteres)";
                this.formClass.errorTitleClass = "is-invalid";
                error++;
            }
            if (this.form.content.length < 4) {
                this.error.content = "*Please, insert a valid content (min 10 characteres)";
                this.formClass.errorContentClass = "is-invalid";
                error++;
            }

            return (error === 0);
        },
        RetrivePosts: async function () {
            let resp = await axios('/api/posts');
            this.posts = resp.data;
        }
    },
    async mounted() {
        await this.RetrivePosts();
    }
});