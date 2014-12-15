$(document).ready(function() {
    
    $(function() {

        $(".fa-bars").click(function(event) {
            $("#profile_menu").toggle();
        });
        
        $(document).on("click", function (event) {
            if($(event.target).closest("#profile_menu").length == 0 && $(event.target).hasClass("fa-bars") == false) {
                $("#profile_menu").hide();
            }
        });
        
        /* for mobile devices */
        $(document).on("touchstart", function(event) {
            if( $(event.target).closest("#profile_menu").length == 0 && $(event.target).hasClass("fa-bars") == false ) {
                $("#profile_menu").hide();
            }
        });
        
        $(".fa-plus").on("click", function(event) {
            if($(event.target).closest(".fa-plus").length !== 0 ) {
                $("td").toggleClass("lol_red");
                return false;
            }
        });

    });


    /* 
     *      Models of entities
     */

    var TableModel = Backbone.Model.extend({
        idAttribute: "row_ID",
        defaults: {
            // "title": "default_title",
            "day": "default_day", // number (ex., "01")
            "month": "default_month", // word (ex., "января")
            "year": "default_year" // number (ex., "2015")
        },
        initialize: function() {
            console.log("TABLE model ...LOADED!");
        }
    });

    var TableModelView = Backbone.View.extend({

        el: $(".some-data table tbody"),
        
        initialize: function() {
            this.render();
        },
        
        render: function() {

            // var table_data = {
            //     "day": "99",
            //     "month": "сентября",
            //     "year": "2014"
            // };
            var table_data = this.model.toJSON();

            // console.log(table_data);

            if(!table_data) {
                table_data = this.model.defaults;
            }

            var table_template = ich.table_template(table_data);
            // this.$el.append("<tr><td><span class=\"date\"> " + table_template + " </span><span class=\"fa fa-chevron-right\"></span></td></tr>");
            this.$el.append(table_template);
            return this;
        }
    });

    var TableDataCollection = Backbone.Collection.extend({
        model: TableModel
    });

    var TableDataCollectionView = Backbone.View.extend({
        el: $(".some-data"),

        initialize: function() {

        },

        render: function() {

            var new_model;

            _.each(this.collection.models, function( model_item ) {
                // model_item = model_item.toJSON();
                // console.log(model_item);
                new_model = new TableModelView({ model: model_item });
            });

            return this;
        }
    });

    var SubjectModel = Backbone.Model.extend({
        idAttribute: "subject_ID",
        defaults: {
            "image": "images/default_picture_leftsidebar.png",
            "title": "default_title",
            "faculty": "default_faculty",
            "department": "default_department",
            "lecturer": "default_lecturer",
            "fofstudy": "default_fofstudy", //field of study
            "group": "default_group"
        },
        initialize: function() {
            console.log("SUBJECT model ...LOADED!");
        }
    });

    var SubjectModelView = Backbone.View.extend({

        el: $(".some-info"),
        
        initialize: function() {
            // this.render();
        },

        render: function() {
            var subject_data = this.model.toJSON();
            if(!subject_data) {
                subject_data = this.model.defaults;
            }
            var subject_template = ich.subject_template(subject_data);
            this.$el.html(subject_template);
            return this;
        }
    });

    //var subjectView = new SubjectModelView({ model: subjectModel});

    // var StudentModel = Backbone.Model.extend({
    //     defaults: {
    //         "fname": "default_fname", //first name
    //         "sname": "default_sname", //second name
    //         "lname": "default_lname", //last name
    //         "group": "default_group",
    //         "year": "default_year",
    //         "degree_type": "default_degree_type",
    //         "fofstudy": "default_fofstudy", //field of study
    //         "faculty": "default_faculty", 
    //         "email": "default_email"
    //     },
    //     initialize: function() {
    //         console.log("STUDENT model ...LOADED!");
    //     }
    // });

    //var studentModel = new StudentModel;
    //console.log(JSON.stringify(studentModel));

    // var StudentModelView = Backbone.View.extend({

    //     // el: $(".some-info"),
        
    //     initialize: function() {
    //         this.render();
    //     },
        
    //     render: function() {

    //         var student_data = {
    //             // "image": "images/default_picture_leftsidebar.png",
    //             // "title": "Администрирование информационных систем",
    //             // "faculty": "Математический",
    //             // "department": "ИМО",
    //             // "lecturer": "Константинопольский Константин Константинович",
    //             // "fofstudy": "ИСИТ", //field of study === название специальности/направления/магистратуры
    //             // "group": "22505"
    //         };

    //         var student_template = ich.student_template(student_data);
    //         this.$el.html(student_template);

    //         return this;
    //     }
    // });

    // var studentView = new StudentModelView({ model: studentModel});


    var DocumentRouter = Backbone.Router.extend({

        routes: {
            "": "clear",
            "error/": "error",
            "subject:id/": "showSubject"
        },

        // Получаем инфу о предмете (справочную + даты проведенных занятий в таблице)
        // Срабатывает, когда, например, переходим со страницы поиска, кликая по нужному предмету
        showSubject: function( id ) {

            $(".left-sidebar").empty();

            // console.log("id: " + id);

            // Здесь должен формироваться запрос информации
            // о предмете по айдишнику модели (соответственно он должен
            // совпадать с тем, который в БД) вместо создания чистого экземпляра

            // алгоритм:
            //  1. запрашиваем json с данными о предмете по idAttribute предмета
            //  2. создаем новый экземпляр и скармливаем ему полученные данные
            //  3. ...
            //  4. профит!

            // Шаг 1
            // var subj_data; // <-- сюда потом сохраним полученные от сервера данные
            // var pathToSubjData = "subject" + id + ".json";
            // $.getJSON(pathToSubjData, function( data ) {
            //     // something will be here soon...
            //     })
            //    .done(function( json ) {
            //          subj_data = data;
            //          console.log( "Ok! We got it!");
            //    })
            //    .fail(function( jqxhr, textStatus, error ) {
            //          var err = textStatus + ", " + error;
            //          console.log( "Request Failed: " + err );
            // });

            // Ручное заполнение - временное решение,
            // чтобы работало без сервера
            var sbj_data = {
                "subject_ID": id,
                "image": "images/default_picture_leftsidebar.png",
                "title": "Администрирование информационных систем",
                "faculty": "Математический",
                "department": "ИМО",
                "lecturer": "Константинопольский Константин Константинович",
                "fofstudy": "ИСИТ", //field of study === название специальности/направления/магистратуры
                "group": "22505"
            };

            // Шаг 2
            var subjectModel = new SubjectModel(sbj_data);
            
            // Передаем модель предмета в его вьюху
            var subjectModelView = new SubjectModelView({model: subjectModel});
            
            // А вот здесь мы должны получить данные о проведенных занятиях
            var tbl_data = [
                {
                    "row_ID": 1,
                    "day": "01",
                    "month": "сентября",
                    "year": "2014"
                },
                {
                    "row_ID": 2,
                    "day": "02",
                    "month": "сентября",
                    "year": "2014"
                },
                {
                    "row_ID": 3,
                    "day": "03",
                    "month": "сентября",
                    "year": "2014"
                },
                {
                    "row_ID": 4,
                    "day": "04",
                    "month": "сентября",
                    "year": "2014"
                },
                {
                    "row_ID": 5,
                    "day": "05",
                    "month": "сентября",
                    "year": "2014"
                },
                {
                    "row_ID": 6,
                    "day": "06",
                    "month": "сентября",
                    "year": "2014"
                },
                {
                    "row_ID": 7,
                    "day": "07",
                    "month": "сентября",
                    "year": "2014"
                },
                {
                    "row_ID": 8,
                    "day": "08",
                    "month": "сентября",
                    "year": "2014"
                },
                {
                    "row_ID": 9,
                    "day": "09",
                    "month": "сентября",
                    "year": "2014"
                },
                {
                    "row_ID": 10,
                    "day": "10",
                    "month": "сентября",
                    "year": "2014"
                }
            ];

            //var tableModel = new TableModel(tbl_data); // <-- вместо создания чистого экземпляра
            var tblCollection = new TableDataCollection(tbl_data);

            //Передаем коллекцию с моделями строк таблицы в её вьюху
            var tblView = new TableDataCollectionView({ collection: tblCollection});

            $(".left-sidebar").html(subjectModelView.render().el);
            $(".left-sidebar").append(tblView.render().el);

            // Это пришлось сделать именно здесь:
            // применяем плагин dataTables для нашей таблицы
            var table = $('table').DataTable( {
                "scrollY": "248px",
                "scrollX": false,
                "scrollCollapse": true,
                "paging": false
            });

            sbj_data = {};
            tbl_data = [];
        },

        clear: function() {
            $(".left-sidebar").empty();
        },

        error: function() {
            $(".left-sidebar").empty();
            $(".left-sidebar").html("<h1>Something went wrong...</h1>");
        },
    });


    var app_router = new DocumentRouter();
    Backbone.history.start();

    app_router.on("clear", function() {
        app_router.navigate("clear", {trigger: true});
    });
    app_router.on("showSubject", function() {
        app_router.navigate("showSubject", {trigger: true});
    });
    app_router.on("error", function() {
        app_router.navigate("error", {trigger: true});
    });


    // app_router.navigate("showSubject", {trigger: true});

    // app_router.on("showSubject", function( document ){

    //     var urlPath = "group" + groupID + "/subject" + subjectID;
    //     app_router.navigate(urlPath, {trigger: true});

    //     alert("lmao");
    // });

    //app_router.trigger("showSubject");
    // app_router.navigate("group/:id/subject/:id", {trigger: true});    
    // app_router.navigate("clear", {trigger: true});



    // var StaffModel = Backbone.Model.extend({
    //     defaults: {
    //         "fname": "default_fname", //first name
    //         "sname": "default_sname", //second name
    //         "lname": "default_lname", //last name
    //         "department": "default_department",
    //         "faculty": "default_faculty",
    //         "email": "default_email" 
    //     },
    //     initialize: function() {
    //         console.log("Staff model has successfully loaded!");
    //     }
    // });

    // var GroupModel = Backbone.Model.extend({
    //     defaults: {
    //         "number": "default_number",
    //         "year": "default_year",
    //         "degree_type": "default_degree_type",
    //         "faculty": "default_faculty"
    //     },
    //     initialize: function() {
    //         console.log("Group model has successfully loaded!");
    //     }
    // });

    // var FofStudyModel = Backbone.Model.extend({
    //     defaults: {
    //         "title" : "default_title",
    //         "degree_type" : "default_degree_type" //bachelor or master or speciality
    //     },
    //     initialize: function() {
    //         console.log("Field of Study model has successfully loaded!");
    //     }
    // });

    // var DepartmentModel = Backbone.Model.extend({
    //     defaults: {
    //         "title": "default_title",
    //         "faculty": "default_faculty",
    //         "email": "default_email",
    //         "phone": "default_phone",
    //         "address": "default_address"
    //     },
    //     initialize: function() {
    //         console.log("Department model has successfully loaded!");
    //     }
    // });

    // var FacultyModel = Backbone.Model.extend({
    //     defaults: {
    //         "title": "default_title",
    //         "email": "default_email",
    //         "phone": "default_phone",
    //         "address": "default_address"
    //     },
    //     initialize: function() {
    //         console.log("Faculty model has successfully loaded!");
    //     }
    // });



    // var studentModel = new StudentModel;
    // var staffModel = new StaffModel;
    // var groupModel = new GroupModel;
    // var fofstudyModel = new FofStudyModel;
    // var departmentModel = new DepartmentModel;
    // var facultyModel = new FacultyModel;

    
    // console.log(JSON.stringify(studentModel));
    // console.log(JSON.stringify(staffModel));
    // console.log(JSON.stringify(groupModel));
    // console.log(JSON.stringify(fofstudyModel));
    // console.log(JSON.stringify(departmentModel));
    // console.log(JSON.stringify(facultyModel));

    /* 
     *      Views of models
     */
    // var SubjectModelView = Backbone.View.extend({
    //     el: $(".some-info"),
    //     initialize: function() {
    //         // this.subject = new SubjectModel;
    //         $(".some-info").append("<p>lololo</p>");
    //     },
    //     // render: function() {
    //     //     var variables = {
    //     //         title: 
    //     //     };
    //     // }
    // });

    // var subjectView = new SubjectModelView;

    // var Controller = Backbone.Router.extend({
    //     routes {
    //         "": "start",
    //         "!/": "start",
    //         "!/": "success",
    //         "!/error": "error"
    //     },
    //     start: function() {

    //     },
    //     success: function() {

    //     },
    //     error: function() {

    //     }
    // });
    /* 
     *      Collections of models
     */

    // var SubjectsList = new Backbone.Collection.extend({
    //     model: SubjectModel
    // });
    // var StudentsList = new Backbone.Collection.extend({
    //     model: StudentModel
    // });
    // var StaffList = new Backbone.Collection.extend({
    //     model: StaffModel
    // });
    // var GroupsList = new Backbone.Collection.extend({
    //     model: GroupModel
    // });
    // var DegreesList = new Backbone.Collection.extend({
    //     model: DegreeModel
    // });
    // var AreasList = new Backbone.Collection.extend({
    //     model: AreaModel
    // });
    // var DepartmentsList = new Backbone.Collection.extend({
    //     model: DepartmentModel
    // });
    // var FacultiesList = new Backbone.Collection.extend({
    //     model: FacultyModel
    // });
    // var AffiliatesList = new Backbone.Collection.extend({
    //     model: AffiliateModel
    // });


});


