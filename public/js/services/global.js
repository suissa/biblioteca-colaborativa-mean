window.app.factory("Global", function(){
	var _this = this;
    _this._data = { 
      user: window.user,
      authenticated: !!window.user, 
      providerTwitter: !!window.user && window.user.provider == 'twitter', 
      providerFacebook: !!window.user && window.user.provider == 'facebook',
      localFacebook: !!window.user && window.user.provider == 'local',
      school : !!window.user ? window.user.school : '',
      hasSchool : !!window.user && window.user.school != '',
      books: [] 
    };

	return _this._data;
});
