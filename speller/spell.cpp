#include "spell.h"

bool isVowel(char& ch) {
	static std::string search = "aeýiuüoöAEIÝUÜOÖ";
	if (search.find(ch) != -1) {
		return true;
	}
	return false;
}

std::vector<std::string> spell(char* word) {
	size_t w_length = strlen(word);
	unsigned int vo_c = 0; 

	for (unsigned int i = 0; i < w_length; ++i) {
		if (isVowel(word[i])) {
			++vo_c;
		}
	}

	std::string tmp;
	std::vector<std::string> syllabes;

	for (int i = w_length - 1; i > -1; --i) {
		if (vo_c == 0) {
			if (syllabes.empty()) {
				syllabes.push_back(std::string(word));
				break;
			}
			else {
				for(; i > -1; --i){
					tmp.push_back(word[i]);
				}
				reverse(tmp.begin(), tmp.end());
				syllabes[syllabes.size() - 1].insert(0, tmp);
			}
		}
		else {
			tmp.push_back(word[i]);
			if (isVowel(word[i])) {
				vo_c--;
				if (!isVowel(word[i - 1])) {
					tmp.push_back(word[--i]);
				}
				reverse(tmp.begin(), tmp.end());
				syllabes.push_back(tmp);
				tmp.clear();
			}
		}
	}
	reverse(syllabes.begin(), syllabes.end());
	return syllabes;
}
