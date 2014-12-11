u1 = User.create(email: 'ripe@gmail.com', password: 'password')
u2 = User.create(email: 'thejamaicandave@gmail.com', password: 'password')

b1 = u1.boards.create(title: 'Workout')
b2 = u1.boards.create(title: 'Jamaica')
b3 = u2.boards.create(title: 'Bouncy')

l1 = b1.lists.create(title: 'todo', ord: 0)
l2 = b1.lists.create(title: 'doing', ord: 1)
l3 = b1.lists.create(title: 'done', ord: 2)

c1 = l3.cards.create(title: 'squats', description: 'feel the burn', ord: 0)
c2 = l3.cards.create(title: 'pushups', description: 'ooh ouch', ord: 1)
c3 = l3.cards.create(title: 'situps', description: 'ouchy', ord: 2)

c4 = l1.cards.create(title: 'super squats', description: 'feel the burn', ord: 0)
c5 = l1.cards.create(title: 'super pushups', description: 'ooh ouch', ord: 1)
c6 = l1.cards.create(title: 'super situps', description: 'ouchy', ord: 2)

c7 = l2.cards.create(title: 'mega squats', description: 'feel the burn', ord: 0)
c8 = l2.cards.create(title: 'mega pushups', description: 'ooh ouch', ord: 1)
c9 = l2.cards.create(title: 'mega situps', description: 'ouchy', ord: 2)

i1 = c1.items.create(done: false, title: 'mocha')
i2 = c1.items.create(done: true, title: 'mocha')
i3 = c1.items.create(done: true, title: 'cookie')

b1.members = [u2]
b1.save
