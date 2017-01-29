$(function() {

     let members;
     try {
       members = JSON.parse(localStorage.members || '[]');
     } catch(e) {
       members = [];
       localStorage.members = '[]';
     }

     $('.add-button').on('click', () => {
       const name = prompt('メンバーの名前を入力してください');
       members.push({name: name});
       save();
       showMember(true);
     });

     function showMember() {
       $('.member-list').empty();
       members.forEach(member => {
         $('<div class="member">')
           .append(
             $('<label>')
               .append(
                $('<input type="checkbox">')//checked="checked"
                   .css({marginRight: 5})
                   .prop('checked', member.checked)
                   .on('change', function() {
                     member.checked = $(this).prop('checked');
                     save();
                   })
               )
               .append(
                $('<span>').text(member.name)
               )
           )
           .append(
             $('<a>').addClass('remove-member').text('x').on('click', () => {
               members = members.filter(e => e.name !== member.name);
               save();
               showMember();
             })
           )
           .appendTo('.member-list');
       });
     }
     showMember();

//     $('.shuffle-2').on('click', () => shuffle(2));
//     $('.shuffle-3').on('click', () => shuffle(3));
//     $('.shuffle-4').on('click', () => shuffle(4));

        for(let i = 2; i <= 4; i++){
            $(".shuffle-" + i).on('click', () => shuffle(i));
        }

     function shuffle(num) {
       num = num || 2;
       const sorted = members.filter(member => member.checked).sort((a, b) => Math.random() > 0.5 ? -1 : 1);

       let results = [];
       let group = [];
       sorted.forEach(member => {
         if (group.length < num) {
           group.push(member);
         } else {
           results.push(group);
           group = [member];
         }
       });
       if (group.length === 1) {
         results[results.length - 1] = results[results.length - 1].concat(group);
       } else {
         results.push(group);
       }

       $('.member-today').empty();
       results.forEach(group => {
         const element = $('<div class="group">').appendTo($('.member-today'));
         group.forEach(member => {
           $('<span class="group-member">').text(member.name+" ").appendTo(element);
         });
       });
     }

     function save() {
       localStorage.members = JSON.stringify(members);
     }


});