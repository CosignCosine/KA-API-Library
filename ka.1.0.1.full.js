var KA = {
                requestCallback: function(href){
                    
                    var pro = new Promise(function(resolve, reject){
                        fetchJsonp(href)
                            .then(function(input){
                                resolve(input.json())
                            })
                            .catch(function(d){
                                reject(d);
                            })
                    });
                    
                    return pro;
                },
                user: function(user){
                    var pro = new Promise(function(resolve, reject){
                        KA.requestCallback('https://www.khanacademy.org/api/internal/user/profile' + (user.substr(0, 4) === "kaid" ? ('?kaid=' + user) : ('?username=' + user)))
                        .then(function(data){
                            var fullData = Object.assign({}, data, {
                                programs: function(){
                                    var pro2 = new Promise(function(resolve, reject){
                                        KA.requestCallback('https://www.khanacademy.org/api/internal/user/scratchpads' + (user.substr(0, 4) === "kaid" ? ('?kaid=' + user) : ('?username=' + user)))
                                            .then(resolve)
                                            .catch(reject)
                                    });
                                    return pro2;
                                },
                                badges: function(){
                                    var pro2 = new Promise(function(resolve, reject){
                                        KA.requestCallback('https://www.khanacademy.org/api/internal/user/badges' + (user.substr(0, 4) === "kaid" ? ('?kaid=' + user) : ('?username=' + user)))
                                            .then(resolve)
                                            .catch(reject)
                                    });
                                    return pro2;
                                },
                                statistics: function(){
                                    var pro2 = new Promise(function(resolve, reject){
                                        KA.requestCallback('https://www.khanacademy.org/api/internal/user/discussion/statistics' + (user.substr(0, 4) === "kaid" ? ('?kaid=' + user) : ('?username=' + user)))
                                            .then(resolve)
                                            .catch(reject)
                                    });
                                    return pro2;
                                },
                            });
                            resolve(fullData)
                        })
                        .catch(function(d){
                            reject(d);
                        })
                    });
                    
                    return pro;
                },
                listPrograms: function(sort, limit){
                    sort = sort || "hot";
                    limit = limit || 10;
                    if(isNaN(sort)){
                        sort = {top: 5, contests: 4, hot: 3, recent: 2}[sort];
                    }
                    var pro = new Promise(function(resolve, reject){
                        KA.requestCallback('https://www.khanacademy.org/api/internal/scratchpads/top?sort=' + sort + '&limit=' + limit)
                        .then(function(d){
                            resolve(d)
                        })
                        .catch(function(d){
                            reject(d);
                        })
                    })
                    return pro;
                },
                program: function(b){
                    var pro = new Promise(function(resolve, reject){
                        KA.requestCallback('https://www.khanacademy.org/api/labs/scratchpads/' + b)
                        .then(function(d){
                            resolve(d)
                        })
                        .catch(function(d){
                            reject(d);
                        })
                    })
                    return pro;
                }
            };
