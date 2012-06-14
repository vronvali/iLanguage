define([ 
    "use!backbone", 
    "corpus/Corpus", 
    "data_list/DataList", 
    "data_list/DataListView",
    "data_list/NewDataListView",
    "datum/Datum", 
    "datum/DatumView", 
    "datum_pref/DatumPref",
    "datum_pref/DatumPrefView",
    "hotkey/HotKey",
    "hotkey/HotKeyConfigView",
    "import/Import",
    "import/ImportView",
    "preference/Preference",
    "preference/PreferenceView",
    "search/Search",
    "search/AdvancedSearchView",
    "session/Session", 
    "session/SessionView",
    "user/User", 
    "user/UserProfileView", 
    "libs/Utils"

], function(
    Backbone, 
    Corpus,
    DataList,
    DataListView,
    NewDataListView,
    Datum,
    DatumView,
    DatumPref,
    DatumPrefView,
    HotKey,
    HotKeyConfigView,
    Import,
    ImportView,
    Preference,
    PreferenceView,
    Search,
    SearchView,
    AdvancedSearchView,
    Session,
    SessionView,
    User,
    UserProfileView
  
) {
  var AppRouter = Backbone.Router.extend(
  /** @lends AppRouter.prototype */
  {
    /**
     * @class Routes URLs to different dashboard layouts and data.As backbone is
     *        a one page app, this shows and hides different "pages", for
     *        example it starts out with a full screen dashboard view, with
     *        datalist and a datum, but when the user clicks the full screen
     *        buttons or uses the navigation menu, and it also happens any time
     *        the URL changes it will make the component full screen by hiding
     *        and showing divs using jquery.
     * 
     * @extends Backbone.Router
     * @constructs
     */
    initialize : function() {
    },

    routes : {
      "corpus/:corpusName" : "showDashboard",
      "corpus/:corpusName/datum/:id" : "showFullscreenDatum",
      "corpus/:corpusName/session/:id" : "showNewSession",
      "corpus/:corpusName/datalist/:id" : "showFullscreenDataList",
      "corpus/:corpusName/datalist" : "newFullscreenDataList",
      "corpus/:corpusName/search" : "showAdvancedSearch",
      "user/:userName" : "showUserProfile",
      "user/:userName/prefs" : "showUserPreferences",
      "user/:userName/datumprefs" : "showDatumPreferences",
      "user/:userName/hotkeyconfig" : "showHotKeyConfig",
      "import/" : "showImport",




      
      
      "" : "showDashboard",
    },

    
    /**
     * Displays the dashboard view of the given corpusName, if one was given. Or
     * the blank dashboard view, otherwise.
     * 
     * @param {String}
     *          corpusName (Optional) The name of the corpus to display.
     */
    showDashboard : function(corpusName) {
      Utils.debug("In showDashboard: " + corpusName);

      $("#dashboard-view").show();
   //   $("#corpus").show();
    //  $("#activity_feed").show();

      
      $("#fullscreen-datum-view").hide();
      $("#new-session-view").hide();
      $("#fullscreen-datalist-view").hide();
      $('#new_data_list').hide();
      $("#fullscreen-search-view").hide();
      $("#fullscreen-user-profile-view").hide();
      $("#user-preferences-view").hide();
      $("#datum-preferences-view").hide();
      $("#hotkey-config-view").hide();
      $('#import').hide();

     



      
      $('#new_data_list').hide();
    },
    /**
     * Displays a page where the user can make their own modified datalist specified by the given
     * corpusName and the given datumId.
     * 
     * @param {String}
     *          corpusName The name of the corpus this datum is from.
     * @param {Number}
     *          sessionId The ID of the session within the corpus.
     */
    newFullscreenDataList : function(corpusName) {
      Utils.debug("In newFullscreenDataList: " + corpusName);

      $("#dashboard-view").show();
      $("#new-session-view").hide();
      $("#fullscreen-datum-view").hide();
      $("#fullscreen-datalist-view").hide();
      $("#fullscreen-datalist-view").hide();
      $('#new_data_list').show();
      $("#fullscreen-search-view").hide();
      $("#fullscreen-user-profile-view").hide();
      $("#user-preferences-view").hide();
      $("#datum-preferences-view").hide();
    },
    
    
    /**
     * Displays the fullscreen view of the datum specified by the given
     * corpusName and the given datumId.
     * 
     * @param {String}
     *          corpusName The name of the corpus this datum is from.
     * @param {Number}
     *          datumId The ID of the datum within the corpus.
     */
    showFullscreenDatum : function(corpusName, datumId) {
      Utils.debug("In showFullscreenDatum: " + corpusName + " *** " + datumId);

      // Change the id of the fullscreen datum view's Datum to be the given datumId
      appView.fullScreenDatumView.model.id = datumId;
      
      // Save the currently displayed Datum, if needed
      appView.fullScreenDatumView.saveScreen();
      
      // Fetch the Datum's attributes from the PouchDB
      appView.fullScreenDatumView.model.fetch({
        success : function() {
          // Update the display with the Datum with the given datumId
          appView.fullScreenDatumView.render();
          
          // Display the fullscreen datum view and hide all the other views
          $("#dashboard-view").show();
          $("#fullscreen-datum-view").show();
          $("#new-session-view").hide();
          $("#fullscreen-datalist-view").hide();
          $('#new_data_list').hide();
          $("#fullscreen-search-view").hide();
          $("#fullscreen-user-profile-view").hide();
          $("#user-preferences-view").hide(); 
          $("#datum-preferences-view").hide();
          $("#hotkey-config-view").hide();
          $('#import').hide();
        },
        
        error : function() {
          Utils.debug("Datum does not exist: " + datumId);
          
          // Create a new Datum and render it
          appView.fullScreenDatumView.model = new Datum();
          appView.fullScreenDatumView.render();
          

        }
      });
    },
    
    
    
    /**
     * Displays the fullscreen view of the session specified by the given
     * corpusName and the given datumId.
     * 
     * @param {String}
     *          corpusName The name of the corpus this datum is from.
     * @param {Number}
     *          sessionId The ID of the session within the corpus.
     */
    showNewSession : function(corpusName, sessionId) {
      Utils.debug("In showFullscreenSession: " + corpusName + " *** "
          + sessionId);

      $("#dashboard-view").show();
      $("#fullscreen-datum-view").hide();
      $("#new-session-view").show();
      $("#fullscreen-datalist-view").hide();
      $('#new_data_list').hide();
      $("#fullscreen-search-view").hide();
      $("#fullscreen-user-profile-view").hide();
      $("#user-preferences-view").hide(); 
      $("#datum-preferences-view").hide();
      $("#hotkey-config-view").hide();
      $('#import').hide();

      


    },
   
    
    /**
     * Displays the fullscreen view of the datalist specified by the given
     * corpusName and the given dataListId
     * 
     * @param {String}
     *          corpusName The name of the corpus this datalist is from.
     * @param {Number}
     *          dataListId The ID of the datalist within the corpus.
     */
    //TODO this guy isn't connected to any div in the DOM right now (there is nothing with the id "fullscreen-datalist-vew")
    showFullscreenDataList : function(corpusName, dataListId) {
      Utils.debug("In showFullscreenDataList: " + corpusName + " *** "
          + dataListId);

      $("#dashboard-view").hide();
      $("#fullscreen-datum-view").hide();
      $("#new-session-view").hide();
      $("#fullscreen-datalist-view").show();
      $('#new_data_list').hide();
      $("#fullscreen-search-view").hide();
      $("#fullscreen-user-profile-view").hide();
      $("#user-preferences-view").hide();
      $("#datum-preferences-view").hide();
      $("#hotkey-config-view").hide();
      $('#import').hide();


    },
    /**
     * Displays a page where the user can make their own modified datalist specified by the given
     * corpusName and the given datumId.
     * 
     * @param {String}
     *          corpusName The name of the corpus this datum is from.
     * @param {Number}
     *          sessionId The ID of the session within the corpus.
     */
    newFullscreenDataList : function(corpusName) {
      Utils.debug("In newFullscreenDataList: " + corpusName);

      $("#dashboard-view").show();
      $("#fullscreen-datum-view").hide();
      $("#new-session-view").hide();
      $("#fullscreen-datalist-view").hide();
      $('#new_data_list').show();
      $("#fullscreen-search-view").hide();
      $("#fullscreen-user-profile-view").hide();
      $("#user-preferences-view").hide();
      $("#datum-preferences-view").hide();
      $("#hotkey-config-view").hide();
      $('#import').hide();


    },
    

   

    /**
     * Display the fullscreen view of search within the corpus specified by the
     * given corpusName.
     * 
     * @param {String}
     *          corpusName The name of the corpus to search in.
     */
    showAdvancedSearch : function(corpusName) {
      Utils.debug("In showAdvancedSearch: " + corpusName);

      $("#dashboard-view").show();
      $("#fullscreen-datum-view").hide();
      $("#new-session-view").hide();
      $("#fullscreen-datalist-view").hide();
      $('#new_data_list').hide();
      $("#fullscreen-search-view").show();
      $("#fullscreen-user-profile-view").hide();
      $("#user-preferences-view").hide();
      $("#datum-preferences-view").hide();
      $("#hotkey-config-view").hide();
      $('#import').hide();


    },

   

    /**
     * Displays the profile of the user specified by the given userName.
     * 
     * @param {String}
     *          userName The username of the user whose profile to display.
     */
    showUserProfile : function(userName) {
      Utils.debug("In showUserProfile: " + userName);
      
      // TODO Set appView.fullScreenUserview.model's properties to be for the
      // user with the given username
      appView.fullScreenUserView.model.set({
        username : "trisapeace",
        password : "pword",
        email : "trisapeace@gmail.com",
        gravatar : "https://secure.gravatar.com/avatar/c671bebad1c949435c348ed5bf4f5fac?s=140&d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-140.png",
        researchInterest : "computers",
        affiliation : "iLanguageLab",
        corpora : [],
        dataLists : [],
        prefs : null,
        firstname : "Theresa",
        lastname : "Deering",
        teams : [],
        sessionHistory : [],
        activityHistory : [],
        permissions : null,
      });

      $("#dashboard-view").show();
      $("#fullscreen-datum-view").hide();
      $("#new-session-view").hide();
      $("#fullscreen-datalist-view").show();
      $('#new_data_list').hide();
      $("#fullscreen-search-view").hide();
      $("#fullscreen-user-profile-view").show();
      $("#user-preferences-view").hide();
      $("#datum-preferences-view").hide();
      $("#hotkey-config-view").hide();
      $('#import').hide();




    },

    /**
     * Displays the preferences of the logged in user.
     * 
     * @param {String}
     *          userName The username of the user logged in.
     */
    showUserPreferences : function(userName) {
      Utils.debug("In showUserPreferences: " + userName);

      $("#dashboard-view").show();
      $("#fullscreen-datum-view").hide();
      $("#new-session-view").hide();
      $("#fullscreen-datalist-view").show();
      $('#new_data_list').hide();
      $("#fullscreen-search-view").hide();
      $("#fullscreen-user-profile-view").hide();
      $("#user-preferences-view").show();
      $("#datum-preferences-view").hide();
      $("#hotkey-config-view").hide();
      $('#import').hide();




    },
    
    showDatumPreferences : function(userName) {
      Utils.debug("In showDatumPreferences: " + userName);

      $("#dashboard-view").show();
      $("#fullscreen-datum-view").hide();
      $("#new-session-view").hide();
      $("#fullscreen-datalist-view").show();
      $('#new_data_list').hide();
      $("#fullscreen-search-view").hide();
      $("#fullscreen-user-profile-view").hide();
      $("#user-preferences-view").hide();
      $("#datum-preferences-view").show();
      $("#hotkey-config-view").hide();
      $('#import').hide();





    },
    
    showHotKeyConfig : function(userName) {
      Utils.debug("In showHotKeyConfig: " + userName);


        $("#dashboard-view").show();
        $("#fullscreen-datum-view").hide();
        $("#new-session-view").hide();
        $("#fullscreen-datalist-view").show();
        $('#new_data_list').hide();
        $("#fullscreen-search-view").hide();
        $("#fullscreen-user-profile-view").hide();
        $("#user-preferences-view").hide();
        $("#datum-preferences-view").hide();
        $("#hotkey-config-view").show();
        $('#import').hide();



      },
    
      showImport : function() {
        Utils.debug("In import: ");

        $("#dashboard-view").show();
        $("#fullscreen-datum-view").hide();
        $("#new-session-view").hide();
        $("#fullscreen-datalist-view").show();
        $('#new_data_list').hide();
        $("#fullscreen-search-view").hide();
        $("#fullscreen-user-profile-view").hide();
        $("#user-preferences-view").hide();
        $("#datum-preferences-view").hide();
        $("#hotkey-config-view").hide();
        $('#import').show();

      }
    
    
    
    

  });

  return AppRouter;
});