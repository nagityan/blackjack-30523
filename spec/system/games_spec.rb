require 'rails_helper'

RSpec.describe "Games", type: :system do
 it "All Inボタンを押すと、全額ベットの状態になる。"do
    visit root_path
    expect(page).to have_content('All In')
    find('button[id="all"]').click
    expect(find('input[id="bet"]').value).to eq(find('input[id="point"]').value)
  end
end
