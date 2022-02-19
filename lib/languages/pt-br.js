/*! 
 * dataFormat.js language configuration
 * language : portuguese brazil (pt-br)
 * author : Fernando Leal : https://github.com/fernandocode
 */
(function (global) {
    'use strict';

    var language = {
        i18n: {
            dayNames: [
              'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab',
              'Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'
            ],
            monthNames: [
              'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
              'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
            ]
        },
        masks: {
            'default': 'ddd dd mmm yyyy HH:MM:ss',
            'shortDate': 'd/m/yy',
            'mediumDate': 'dd/mm/yyyy',
            'longDate': 'd mmmm, yyyy',
            'fullDate': 'dddd, d mmmm, yyyy',
            'shortTime': 'H:MM',
            'mediumTime': 'H:MM:ss',
            'longTime': 'H:MM:ss Z',
            'isoDate': 'yyyy-mm-dd',
            'isoTime': 'HH:MM:ss',
            'isoDateTime': 'yyyy-mm-dd\'T\'HH:MM:sso',
            'isoUtcDateTime': 'UTC:yyyy-mm-dd\'T\'HH:MM:ss\'Z\'',
            'expiresHeaderFormat': 'ddd, dd mmm yyyy HH:MM:ss Z'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && global.dateFormat) {
        if (!global.dateFormat.language) {
            global.dateFormat.language = [];
        }
        global.dateFormat.language['pt-br'] = language;
    }

    // set default (Browser)
    if (global.dateFormat.language['pt-br']) {
        global.dateFormat.i18n = global.dateFormat.language['pt-br'].i18n;
        global.dateFormat.masks = global.dateFormat.language['pt-br'].masks;
    }

}(this));
