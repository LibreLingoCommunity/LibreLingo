"""
this file contains tests of the funcion
librelingo_yaml_loader.yaml_loader._convert_characters
"""

import pytest
from librelingo_fakes import fakes
from librelingo_yaml_loader.yaml_loader import _convert_characters


def test_returns_a_list():
    assert isinstance(_convert_characters([]), list)


@pytest.fixture
def mock_convert_character(mocker):
    return mocker.patch("librelingo_yaml_loader.yaml_loader._convert_characters")


def test_converts_every_word(mock_convert_character):
    raw_characters = [None] * fakes.number()
    assert len(_convert_characters(raw_characters)) == len(raw_characters)


def test_returns_correct_value(mock_convert_character):
    mock_convert_character.return_value = fakes.fake_value()
    assert _convert_characters([None]) == [mock_convert_character.return_value]


def test_calls_convert_word_with_correct_values(mock_convert_character):
    char1 = fakes.fake_value()
    char2 = fakes.fake_value()
    _convert_characters([char1, char2])
    mock_convert_character.assert_any_call(char1)
    mock_convert_character.assert_any_call(char2)
