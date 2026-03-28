(function () {
  var DATA_BASE = "./database";

  function readLs(key, fallback) {
    try {
      var s = localStorage.getItem(key);
      return s ? JSON.parse(s) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function writeLs(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }

  function fetchJson(path) {
    return fetch(path).then(function (res) {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    });
  }

  function mergeList(baseArr, extraKey, deletedKey) {
    var extras = readLs(extraKey, []);
    var deleted = new Set(
      (readLs(deletedKey, []) || []).map(function (x) {
        return String(x);
      }),
    );
    var base = (baseArr || []).filter(function (x) {
      return !deleted.has(String(x.id));
    });
    var extraOk = extras.filter(function (x) {
      return !deleted.has(String(x.id));
    });
    return base.concat(extraOk);
  }

  function deleteById(id, extraKey, deletedKey) {
    id = String(id);
    var extras = readLs(extraKey, []);
    var idx = extras.findIndex(function (x) {
      return String(x.id) === id;
    });
    if (idx >= 0) {
      extras.splice(idx, 1);
      writeLs(extraKey, extras);
      return;
    }
    var del = readLs(deletedKey, []);
    if (del.indexOf(id) === -1) del.push(id);
    writeLs(deletedKey, del);
  }

  window.getHomepageProducts = function () {
    return fetchJson(DATA_BASE + "/homepage.json").then(function (j) {
      return Array.isArray(j.products) ? j.products : [];
    });
  };

  window.getMobilesList = function () {
    return fetchJson(DATA_BASE + "/mobiles.json").then(function (j) {
      return mergeList(j.mobile || [], "olx_extra_mobiles", "olx_deleted_mobiles");
    });
  };

  window.getBikesList = function () {
    return fetchJson(DATA_BASE + "/bikes.json").then(function (j) {
      return mergeList(j.bikes || [], "olx_extra_bikes", "olx_deleted_bikes");
    });
  };

  window.getApartmentsList = function () {
    return fetchJson(DATA_BASE + "/appartment.json").then(function (j) {
      return mergeList(
        j.appartments || [],
        "olx_extra_apartments",
        "olx_deleted_apartments",
      );
    });
  };

  window.getUsersList = function () {
    return fetchJson(DATA_BASE + "/users.json").then(function (j) {
      return mergeList(j.users || [], "olx_extra_users", "olx_deleted_users");
    });
  };

  window.addMobileAd = function (ad) {
    var extras = readLs("olx_extra_mobiles", []);
    extras.push(
      Object.assign({}, ad, { id: "local-" + Date.now() }),
    );
    writeLs("olx_extra_mobiles", extras);
  };

  window.addBikeAd = function (ad) {
    var extras = readLs("olx_extra_bikes", []);
    extras.push(
      Object.assign({}, ad, { id: "local-" + Date.now() }),
    );
    writeLs("olx_extra_bikes", extras);
  };

  window.addApartmentAd = function (ad) {
    var extras = readLs("olx_extra_apartments", []);
    extras.push(
      Object.assign({}, ad, { id: "local-" + Date.now() }),
    );
    writeLs("olx_extra_apartments", extras);
  };

  window.addUserLocal = function (user) {
    var extras = readLs("olx_extra_users", []);
    extras.push(user);
    writeLs("olx_extra_users", extras);
  };

  window.deleteMobileById = function (id) {
    deleteById(id, "olx_extra_mobiles", "olx_deleted_mobiles");
  };

  window.deleteBikeById = function (id) {
    deleteById(id, "olx_extra_bikes", "olx_deleted_bikes");
  };

  window.deleteApartmentById = function (id) {
    deleteById(id, "olx_extra_apartments", "olx_deleted_apartments");
  };

  window.deleteUserById = function (id) {
    deleteById(id, "olx_extra_users", "olx_deleted_users");
  };
})();
