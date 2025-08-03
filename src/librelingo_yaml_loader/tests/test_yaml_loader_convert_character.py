"""
this file contains tests of the funcion
librelingo_yaml_loader.yaml_loader._convert_character
"""

import pytest
from librelingo_fakes import fakes
from librelingo_types import Character
from librelingo_yaml_loader.yaml_loader import _convert_character


def _access_functions(in_key):
    def getter(raw_word):
        return raw_word[in_key]

    def remover(raw_word):
        del raw_word[in_key]

    return getter, remover


# _GET_ALSO_ACCEPTED, _REMOVE_ALSO_ACCEPTED = _access_functions("Also accepted")


@pytest.fixture
def raw_fake_character():
    """returns the raw data describing the word used in tests in this file"""
    return {
        "Character": fakes.fake_value(),
        "Transliteration": [
            fakes.fake_value(),
            fakes.fake_value(),
        ],
        "IPA": [
            fakes.fake_value(),
            fakes.fake_value(),
            fakes.fake_value(),
            fakes.fake_value(),
        ],
    }


def test_returns_a_character_object(raw_fake_character):
    assert isinstance(_convert_character(raw_fake_character), Character)


def test_includes_the_correct_character(raw_fake_character):
    assert _convert_character(raw_fake_character).character == raw_fake_character["Character"]


def test_includes_main_word(raw_fake_character):
    assert _convert_character(raw_fake_character).in_target_language[0] == raw_fake_character["Word"]


def test_includes_ipa_pronounciations(raw_fake_character):
    result = _convert_character(raw_fake_character).ipa_pronounciation
    assert all(_ in result for _ in raw_fake_character["IPA"])


def test_ipa_is_optional(raw_fake_character):
    del raw_fake_character["IPA"]
    assert len(_convert_character(raw_fake_character).ipa_pronounciation) == 1


def test_includes_transliterations(raw_fake_character):
    result = _convert_character(raw_fake_character).transliteration
    assert all(_ in result for _ in raw_fake_character["Transliteration"])
    
