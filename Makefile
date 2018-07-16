# Copyright 2017 JanusGraph Authors
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

VERB = @
ifeq ($(VERBOSE),1)
	VERB =
endif

.PHONY default:
	$(VERB) echo "Available targets: install, serve"

# Pushes the current branch, provided via $(git rev-parse ...) to the `gh-pages`
# branch on your repo. Assumes this branch is set to display a preview via
# GitHub pages, as recommended in the instructions on the git repo:
# https://github.com/janusgraph/janusgraph.org/#preview-via-github
preview-via-github:
	git push -f origin $$(git rev-parse --abbrev-ref HEAD):gh-pages

install:
	$(VERB) bundle install --path .bundle

serve:
	$(VERB) bundle exec jekyll serve
